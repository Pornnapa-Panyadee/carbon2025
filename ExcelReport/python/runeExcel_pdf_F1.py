import os
import sys
import shutil
from datetime import datetime
import subprocess
import platform
from openpyxl import load_workbook
from openpyxl.drawing.image import Image
import requests
import json

import sys
import os
os.system("chcp 65001")  # เปลี่ยน code page เป็น UTF-8
sys.stdout.reconfigure(encoding='utf-8')  # Python 3.7+

# ----------------- Arguments -----------------
if len(sys.argv) < 3:
    print("Usage: python runExcel.py <company_name> <product_1>")
    sys.exit(1)

company_name = sys.argv[1]
product_1 = sys.argv[2]

# ----------------- API Call -----------------
url = f"http://localhost:5000/api/v1/f1/excel/{company_name}/{product_1}"
resp = requests.get(url)
if resp.status_code != 200:
    print("เกิดข้อผิดพลาดในการเรียก API:", resp.status_code)
    sys.exit(1)

data = resp.json()
product = data.get("product", {})
company = data.get("company", {})

# ----------------- Helper -----------------
def thai_date_format(iso_date_str):
    if not iso_date_str:
        return ""
    try:
        dt = datetime.fromisoformat(iso_date_str.replace("Z", "+00:00"))
    except ValueError:
        return "รูปแบบวันที่ไม่ถูกต้อง"

    months_th = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม",
                 "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม",
                 "พฤศจิกายน", "ธันวาคม"]
    return f"{dt.day} {months_th[dt.month]} {dt.year + 543}"

# ----------------- Prepare Data -----------------
start = thai_date_format(product.get("collect_data_start"))
end = thai_date_format(product.get("collect_data_end"))
date_range = f"{start} - {end}"
submitted_date_thai = thai_date_format(product.get("submitted_date"))

techinfo_raw = product.get("product_techinfo") or "[]"
techinfo_list = json.loads(techinfo_raw) if techinfo_raw else []
product_techinfo_array = [str(i).strip() for i in techinfo_list]

# ----------------- File Paths -----------------
template_path = "ExcelReport/excel/form_CFP_pdf.xlsx"
timestamp = datetime.now().strftime("%Y")
output_dir = "ExcelReport/output"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_xlsx = os.path.join(output_dir, f"{timestamp}_{company.get('name','')}_{product.get('product_name_en','')}.xlsx")
shutil.copy(template_path, output_xlsx)

# ----------------- Load Workbook -----------------
wb = load_workbook(output_xlsx)
ws01 = wb["Fr-01"]

# ----------------- Fill Excel -----------------
ws01["J2"] = date_range
ws01["F5"] = company.get("name", "")
ws01["F6"] = product.get("product_name_th", "")
ws01["J10"] = product.get("product_name_th", "")
ws01["J11"] = product.get("product_name_en", "")
ws01["J12"] = product.get("scope", "")
ws01["J13"] = f"{product.get('FU_value','0')} {product.get('FU_th_name','')}" if product.get('FU_value') else "0"
ws01["J14"] = f"{product.get('FU_value','0')} {product.get('FU_en_name','')}" if product.get('FU_value') else "0"
ws01["J15"] = f"{product.get('PU_value','0')} {product.get('PU_th_name','')}" if product.get('PU_value') else "0"
ws01["J16"] = f"{product.get('PU_value','0')} {product.get('PU_en_name','')}" if product.get('PU_value') else "0"
ws01["J17"] = product.get("sale_ratio", "")

# Product tech info
start_row = 19
col = "I"
for idx, info in enumerate(product_techinfo_array):
    ws01[f"{col}{start_row + idx}"] = info

ws01["J24"] = product.get("pcr_name", "")
ws01["J25"] = submitted_date_thai

# Add image if exists
image_url = product.get("product_photo", "")
if image_url and os.path.isfile(image_url):
    img = Image(image_url)
    img.width = 300
    img.height = 300
    ws01.add_image(img, "B12")

# Save Excel
wb.save(output_xlsx)
print("Excel saved:", output_xlsx)

# ----------------- Export Sheet Fr-01 to PDF -----------------
def export_pdf_windows_excel(input_file, output_file):
    import win32com.client
    excel = win32com.client.Dispatch("Excel.Application")
    excel.Visible = False
    wb_com = excel.Workbooks.Open(os.path.abspath(input_file))
    ws_com = wb_com.Sheets("Fr-01")
    ws_com.ExportAsFixedFormat(0, os.path.abspath(output_file))
    wb_com.Close(False)
    excel.Quit()

def export_pdf_libreoffice(input_file, output_dir):
    # ต้องระบุ path ของ LibreOffice หรือ soffice.exe
    if platform.system() == "Windows":
        libreoffice_path = r"C:\Program Files\LibreOffice\program\soffice.exe"
    else:
        libreoffice_path = "libreoffice"
    if not os.path.exists(libreoffice_path):
        raise FileNotFoundError(f"LibreOffice not found at {libreoffice_path}")

    subprocess.run([
        libreoffice_path,
        "--headless",
        "--convert-to", "pdf",
        "--outdir", output_dir,
        input_file
    ], check=True)

# PDF output path
output_pdf = os.path.join(output_dir, f"{timestamp}_{company.get('name','')}_{product.get('product_name_en','')}_Fr01.pdf")

try:
    if platform.system() == "Windows":
        try:
            export_pdf_windows_excel(output_xlsx, output_pdf)
            print("PDF saved via Excel COM:", output_pdf)
        except Exception:
            # ถ้าไม่มี Excel ใช้ LibreOffice
            export_pdf_libreoffice(output_xlsx, output_dir)
            print("PDF saved via LibreOffice:", output_pdf)
    else:
        export_pdf_libreoffice(output_xlsx, output_dir)
        print("PDF saved via LibreOffice:", output_pdf)
except Exception as e:
    print("PDF export failed:", e)
