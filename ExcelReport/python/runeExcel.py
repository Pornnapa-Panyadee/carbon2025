import openpyxl
from openpyxl import load_workbook
from openpyxl.drawing.image import Image
from openpyxl.utils import units
from openpyxl.styles import Border, Side
from openpyxl.styles import PatternFill
from openpyxl.styles import Font
import requests
from datetime import datetime
import requests
import shutil
import json
import sys

import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

if len(sys.argv) < 3:
        print("Usage: python runExcel.py <company_name> <product_1>")
        sys.exit(1)

company_name = sys.argv[1]
product_1 = sys.argv[2]

form1 = "http://localhost:5000/api/v1/f1/"+company_name + "/" + product_1
form4_1= "http://localhost:5000/api/v1/f4-1/form/"+product_1
form4_2= "http://localhost:5000/api/v1/f4-2/form/"+product_1

def thai_date_format(iso_date_str):
    # แปลง string เป็น datetime object
    dt = datetime.fromisoformat(iso_date_str.replace("Z", "+00:00"))
    
    # สร้างชื่อเดือนภาษาไทย
    months_th = ["", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม",
                 "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม",
                 "พฤศจิกายน", "ธันวาคม"]
    
    day = dt.day
    month = months_th[dt.month]
    year = dt.year + 543  # เปลี่ยนเป็นปี พ.ศ.
    
    return f"{day} {month} {year}"

# ///check Source Form4-1
def check_source_form4_1(ef_source, row, ws_name='ws41'):
    ef_map = {
        'Self collect': 'I',
        'Supplier': 'J',
        'PCR Gen.': 'K',
        'TGO EF': 'L',
        'Int. DB': 'M',
        'Others': 'N'
    }

    if ef_source in ef_map:
        col = ef_map[ef_source]
        cell = f'{col}{row}'
        return f'{ws_name}["{cell}"] = "●"'
    else:
        return f'# ef_source \"{ef_source}\" not recognized'


def check_source_form4_2_T1(type1_ef_source, row, ws_name='ws42'):
    ef_map = { 'TGO EF': 'K','Int. DB': 'L'}

    if type1_ef_source in ef_map:
        col = ef_map[type1_ef_source]
        cell = f'{col}{row}'
        return f'{ws_name}["{cell}"] = "●"'
    else:
        return f'# type1_ef_source \"{type1_ef_source}\" not recognized'

def check_source_form4_2_T2(type2_ef_source, row, ws_name='ws42'):
    ef_map = { 'TGO EF': 'T','Int. DB': 'U'}

    if type2_ef_source in ef_map:
        col = ef_map[type2_ef_source]
        cell = f'{col}{row}'
        return f'{ws_name}["{cell}"] = "●"'
    else:
        return f'# type2_ef_source \"{type2_ef_source}\" not recognized'


# กำหนดเส้นกรอบแต่ละด้าน (เส้นบางและเส้นปะ)
thin_border = Border(
    left=Side(border_style="thin", color="000000"),
    right=Side(border_style="thin", color="000000"),
    top=Side(border_style="thin", color="000000"),
    bottom=Side(border_style="thin", color="000000")
)

thin_top = Border(
    top=Side(border_style="thin", color="000000")
)

def set_borderThinTop(ws, cell_range,position):
    rows = ws[cell_range]
    for row in rows:
        for cell in row:
            if position == 'left':
                cell.border = Border(left=Side(style='thin'))
            elif position == 'right':
                cell.border = Border(right=Side(style='thin'))
            elif position == 'top':
                cell.border = Border(
                    top=Side(style='thin'),
                    left=Side(style='thin'),
                    right=Side(style='thin')
                )
            elif position == 'bottom':
                 cell.border = Border(
                    bottom=Side(style='thin'),
                    left=Side(style='thin'),
                    right=Side(style='thin')
                )

    
def set_borderTop(ws, cell_range,position):
    rows = ws[cell_range]
    for row in rows:
        for cell in row:
            if position == 'left':
                cell.border = Border(left=Side(style='dashed'))
            elif position == 'right':
                cell.border = Border(right=Side(style='dashed'))
            elif position == 'top':
                cell.border = Border(top=Side(style='dashed'))
            elif position == 'bottom':
                 cell.border = Border(
                    bottom=Side(style='dashed'),
                    left=Side(style='dashed'),
                    right=Side(style='dashed')
                )
            
def set_borderCenter(ws, cell_range, position):
    rows = ws[cell_range]
    for row in rows:
        for cell in row:
            # อ่าน border เดิมก่อน
            border_old = cell.border

            # กำหนดด้านใหม่ตาม position
            new_border = Border(
                left=border_old.left if position != 'left' else Side(style='mediumDashed'),
                right=border_old.right if position != 'right' else Side(style='mediumDashed'),
                top=border_old.top if position != 'top' else Side(style='mediumDashed'),
                bottom=border_old.bottom if position != 'bottom' else Side(style='mediumDashed')
            )

            cell.border = new_border

def set_border(ws, cell_range):
    rows = ws[cell_range]
    for row in rows:
        for cell in row:
            cell.border = thin_border




# Fr-01, Fr.02, Fr.03
form1 = requests.get(form1)
if form1.status_code == 200:
    data = form1.json()
    product = data["product"]
    company = data["company"]
    process = data["process"]
else:
    print("เกิดข้อผิดพลาดในการเรียก API:", response.status_code)
start = thai_date_format(product["collect_data_start"])
end = thai_date_format(product["collect_data_end"])
date_range = f"{start} - {end}"
submitted_date_thai = thai_date_format(product.get("submitted_date"))
techinfo_list = json.loads(product["product_techinfo"])
product_techinfo_array = [item.strip() for item in techinfo_list]

form4_1 = requests.get(form4_1)
if form4_1.status_code == 200:
    data41 = form4_1.json()
    form41 = data41["form41"]
    company = data41["company"]
    product = data41["product"]
    process = data41["process"]
    report41Sum = data41["report41Sum"]
else:
    print("เกิดข้อผิดพลาดในการเรียก API:", form4_1.status_code)

form4_2 = requests.get(form4_2)
if form4_2.status_code == 200:
    data42 = form4_2.json()
    form42 = data42["form42"]
    company = data42["company"]
    product = data42["product"]
    process = data42["process"]
    report42Sum = data42["report42Sum"]
else:
    print("เกิดข้อผิดพลาดในการเรียก API:", form4_2.status_code)


file_path = "ExcelReport/excel/form_CFP.xlsx"
output_path = "ExcelReport/output/"+company["name"]+"_"+product["product_name_en"]+".xlsx"
shutil.copy(file_path, output_path)
process = data["process"]
wb = load_workbook(file_path)


######## ------------------Fr-01---------------------------------------------------
ws01 = wb["Fr-01"] # หรือระบุชื่อ sheet: wb["Sheet1"]

ws01["J2"] = date_range
ws01["F5"] = company.get("name", "")
ws01["F6"] = product.get("product_name_th", "")
ws01["J10"] = product.get("product_name_th", "")
ws01["J11"] = product.get("product_name_en", "")
ws01["J12"] = product.get("scope", "")
ws01["J13"] = str(product.get("FU_value", "")) + " " + product.get("FU_th", "")
ws01["J14"] = str(product.get("FU_value", "")) + " " + product.get("FU_en", "")
ws01["J15"] = str(product.get("PU_value", "")) + " " + product.get("PU_th", "")
ws01["J16"] = str(product.get("PU_value", "")) + " " +product.get("PU_en", "")
ws01["J17"] = product.get("sale_ratio", "")

start_row = 19
col = "I"
for idx, info in enumerate(product_techinfo_array):
    cell = f"{col}{start_row + idx}"
    ws01[cell] = info

ws01["J24"] = product.get("pcr_reference", "")
ws01["J25"] = submitted_date_thai

# image 
image_url = ""+product.get("product_photo")
img = Image(image_url)  
img.width = 300 
img.height = 300  
ws01.add_image(img, "B12")  

######## ---------------------------------------------------------------------
ws02 = wb["Fr-02"]
for i in range(len(process)):
    input_names = []
    row = 13 + (3 * i)
    row_next = row + 1
    
    # ใส่ชื่อ process
    ws02.merge_cells(f"M{row}:O{row_next}")
    ws02[f"M{row}"] = process[i]['process_name']
    set_border(ws02, f"M{row}:O{row_next}")
    
    # ใส่คำว่า "ขนส่ง" และกำหนดเส้นขอบ
    ws02.merge_cells(f"I{row}:I{row_next}")
    ws02[f"I{row}"] = "ขนส่ง"
    set_border(ws02, f"I{row}:I{row_next}")
    ws02[f"H{row_next}"].border = thin_top
    ws02[f"J{row_next}"].border = thin_top
    ws02[f"K{row_next}"].border = thin_top
    
    
    # รวมชื่อ inputs ที่ไม่ใช่ "ผลิตภัณฑ์"
    input_names = [item['input_name'] for cat in process[i]['inputs'] for item in cat['items']]
    input_names_str = ', '.join(input_names)
    
    # ใส่ข้อมูลรวมชื่อ input
    ws02.merge_cells(f"C{row}:F{row_next}")
    ws02[f"C{row}"] = input_names_str
    set_border(ws02, f"C{row}:F{row_next}")

row_end= row_next + 2
# Box Input
ws02.merge_cells(f"B12:B{row_end-1}")
set_borderTop(ws02, f"B12:B{row_end-1}",'left')
ws02.merge_cells(f"G12:G{row_end-1}")
set_borderTop(ws02, f"G12:G{row_end-1}",'right')
ws02.merge_cells(f"B{row_end}:G{row_end}")
set_borderTop(ws02, f"B{row_end}:G{row_end}",'bottom')
# Box Process
ws02.merge_cells(f"L12:L{row_end-1}")
set_borderTop(ws02, f"L12:L{row_end-1}",'left')
ws02.merge_cells(f"P12:P{row_end-1}")
set_borderTop(ws02, f"P12:P{row_end-1}",'right')
ws02.merge_cells(f"L{row_end}:P{row_end}")
set_borderTop(ws02, f"L{row_end}:P{row_end}",'bottom')
# Box Center
# ws02.merge_cells(f"J8:J{row_end+3}")

set_borderCenter(ws02, f"J8:J{row_end+3}",'right')
    
######## ---------------------------------------------------------------------
ws03 = wb["Fr-03 (2)"]   
fill = PatternFill(start_color='FFFFFF99', end_color='FFFFFF99', fill_type='solid') 
fill_intput_head = PatternFill(start_color='FF92D050', end_color='FF92D050', fill_type='solid')
fill_intput = PatternFill(start_color='FFCCFFCC', end_color='FFCCFFCC', fill_type='solid')
fill_output = PatternFill(start_color='FFFFCC99', end_color='FFFFCC99', fill_type='solid')
fill_waste = PatternFill(start_color='FFCCFFFF', end_color='FFCCFFFF', fill_type='solid')
fill_arrow = PatternFill(start_color='00000000', end_color='00000000', fill_type='solid')
row = 13 
for i in range(len(process)):
    input_names = []
    row_input = row
    row_input_offset = 0
    max_input_rows = 0 

    # ===== Input Section =====
    input_categories = process[i]['inputs']
    num_categories = len(input_categories)

    for j in range(max(1, num_categories)):
        if num_categories > 0:
            category = input_categories[j]
            items = category['items']
            num_items = len(items)
            input_title = category['input_title']
        else:
            items = []
            num_items = 0
            input_title = "ไม่มีข้อมูล"  # หรือจะเป็น "" ตามที่คุณต้องการ

        current_row = row_input + row_input_offset
        ws03.merge_cells(f"B{current_row}:D{current_row}")
        ws03[f"B{current_row}"] = input_title
        ws03[f"B{current_row}"].fill = fill_intput_head

        # ถ้ามี item จริง
        if num_items > 0:
            for k in range(num_items):
                ws03[f"B{current_row + k + 1}"] = items[k]['input_name']
                ws03[f"C{current_row + k + 1}"] = items[k]['input_quantity']
                ws03[f"D{current_row + k + 1}"] = items[k]['input_unit']

                ws03[f"B{current_row + k + 1}"].fill = fill_intput
                ws03[f"C{current_row + k + 1}"].fill = fill_intput
                ws03[f"D{current_row + k + 1}"].fill = fill_intput
        else:
            # ใส่ช่องว่างแถวล่างไว้ 1 แถวพร้อมสี
            ws03[f"B{current_row + 1}"] = ""
            ws03[f"C{current_row + 1}"] = ""
            ws03[f"D{current_row + 1}"] = ""

            ws03[f"B{current_row + 1}"].fill = fill_intput
            ws03[f"C{current_row + 1}"].fill = fill_intput
            ws03[f"D{current_row + 1}"].fill = fill_intput

        row_input_offset += 1 + max(1, num_items)
        max_input_rows += 1 + max(1, num_items)
    # ===== Process Block ด้านขวา =====
    process_row = row
    ws03.merge_cells(f"F{process_row}:I{process_row}")
    ws03[f"F{process_row}"] = process[i]['ordering']
    ws03[f"F{process_row}"].fill = fill
    set_borderThinTop(ws03, f"F{process_row}:I{process_row}", 'top')

    ws03.merge_cells(f"F{process_row + 1}:I{process_row + 5}")
    ws03[f"F{process_row + 1}"] = process[i]['process_name']
    ws03[f"F{process_row + 1}"].fill = fill
    set_borderThinTop(ws03, f"F{process_row + 1}:I{process_row + 5}", 'bottom')

    # ===== output =====
    ws03[f"I{process_row + 7}"] = "ผลิตภัณฑ์"
    ws03[f"I{process_row + 7}"].fill = fill_intput_head 

    for j in range(len(process[i]['outputs'])):
        output = process[i]['outputs'][j]
        ws03[f"I{process_row + 8 + j}"] = output['output_name']
        ws03[f"J{process_row + 8 + j}"] = output['output_quantity']
        ws03[f"K{process_row + 8 + j}"] = output['output_unit']
        ws03[f"I{process_row + 8 + j}"].fill = fill_output
        ws03[f"J{process_row + 8 + j}"].fill = fill_output
        ws03[f"K{process_row + 8 + j}"].fill = fill_output

    # ===== waste =====
    waste_head=["ผลิตภัณฑ์ร่วม", "ของเสีย"]
    row_input_offset = 0
    current_row = row_input + row_input_offset
    waste_total_rows = 0 

    if process[i]['wastes'] == []:
        ws03.merge_cells(f"K{current_row}:M{current_row}")
        ws03[f"K{current_row}"] = waste_head[0]
        ws03[f"K{current_row}"].fill = fill_intput_head
        ws03.merge_cells(f"K{current_row + 1}:M{current_row + 1}")
        ws03[f"K{current_row + 1}"].fill = fill_waste

        ws03.merge_cells(f"K{current_row+2}:M{current_row+2}")
        ws03[f"K{current_row+2}"] = waste_head[1]
        ws03[f"K{current_row+2}"].fill = fill_intput_head
        ws03.merge_cells(f"K{current_row + 3}:M{current_row + 3}")
        ws03[f"K{current_row + 3}"].fill = fill_waste
    else:
        len_waste = len(process[i]['wastes'])
        if(len_waste == 1):
            if process[i]['wastes'][0]['waste_cat_name'] == waste_head[0]:
                ws03.merge_cells(f"K{current_row}:M{current_row}")
                ws03[f"K{current_row}"] = waste_head[0]
                ws03[f"K{current_row}"].fill = fill_intput_head
                for j in range(len(process[i]['wastes'][0]['items'])):
                    item = process[i]['wastes'][0]['items'][j]
                    ws03[f"K{current_row + 2 + j}"] = item['waste_name']
                    ws03[f"L{current_row + 2 + j}"] = item['waste_qty']
                    ws03[f"M{current_row + 2 + j}"] = item['waste_unit']
                    ws03[f"K{current_row + 2 + j}"].fill = fill_waste
                    ws03[f"L{current_row + 2 + j}"].fill = fill_waste
                    ws03[f"M{current_row + 2 + j}"].fill = fill_waste
                
                
                waste_total_rows += len(process[i]['wastes'][0]['items']) + 2

                ws03.merge_cells(f"K{waste_total_rows}:M{waste_total_rows}")
                ws03[f"K{waste_total_rows}"] = waste_head[0]
                ws03[f"K{waste_total_rows}"].fill = fill_intput_head
                ws03.merge_cells(f"K{waste_total_rows+1}:M{waste_total_rows+1}")
                ws03[f"K{waste_total_rows+1}"].fill = fill_waste

            else:

                ws03.merge_cells(f"K{current_row}:M{current_row}")
                ws03[f"K{current_row}"] = waste_head[0]
                ws03[f"K{current_row}"].fill = fill_intput_head
                ws03.merge_cells(f"K{current_row + 1}:M{current_row + 1}")
                ws03[f"K{current_row + 1}"].fill = fill_waste
                ws03.merge_cells(f"K{current_row + 2}:M{current_row + 2}")
                ws03[f"K{current_row + 2}"] = waste_head[1] 
                ws03[f"K{current_row + 2}"].fill = fill_intput_head


                for j in range(len(process[i]['wastes'][0]['items'])):
                    item = process[i]['wastes'][0]['items'][j]
                    ws03[f"K{current_row + 3 + j}"] = item['waste_name']
                    ws03[f"L{current_row + 3 + j}"] = item['waste_qty']
                    ws03[f"M{current_row + 3 + j}"] = item['waste_unit']
                    ws03[f"K{current_row + 3 + j}"].fill = fill_waste
                    ws03[f"L{current_row + 3 + j}"].fill = fill_waste
                    ws03[f"M{current_row + 3 + j}"].fill = fill_waste

                waste_total_rows += len(process[i]['wastes'][0]['items']) + 2

        for j in range(len(process[i]['wastes'])):

            if process[i]['wastes'][0]['waste_cat_name']==waste_head[j]:
                ws03.merge_cells(f"K{current_row}:M{current_row}")
                ws03[f"K{current_row}"] = waste_head[0]
                ws03[f"K{current_row}"].fill = fill_intput_head
                 # เขียนรายการผลิตภัณฑ์ร่วม
                for j in range(len(process[i]['wastes'][0]['items'])):
                    item = process[i]['wastes'][0]['items'][j]
                    ws03[f"K{current_row + 2 + j}"] = item['waste_name']
                    ws03[f"L{current_row + 2 + j}"] = item['waste_qty']
                    ws03[f"M{current_row + 2 + j}"] = item['waste_unit']
                    ws03[f"K{current_row + 2 + j}"].fill = fill_waste
                    ws03[f"L{current_row + 2 + j}"].fill = fill_waste
                    ws03[f"M{current_row + 2 + j}"].fill = fill_waste

                waste_total_rows += len(process[i]['wastes'][0]['items']) + 2
            else:
                ws03.merge_cells(f"K{current_row}:M{current_row}")
                ws03[f"K{current_row}"] = waste_head[0]
                ws03[f"K{current_row}"].fill = fill_intput_head
                ws03.merge_cells(f"K{current_row + 1}:M{current_row + 1}")
            
            ws03[f"K{current_row + 1}"].fill = fill_waste

    # ===== ปรับ row สำหรับ process ถัดไป =====
    ws03[f"E{process_row+2}"].fill = fill_arrow
    ws03[f"J{process_row+2}"].fill = fill_arrow
    # ws03.merge_cells(f"H{process_row+6}:H{process_row+6+4}")
    # ws03[f"H{process_row+6}"].fill = fill_arrow

    if (max_input_rows <=6):
        u=process_row+6
        l=process_row+9
    else:
        x=max_input_rows-9
        u=process_row+6
        l=process_row+10+x
    
    if j< len(process)-1:
        ws03.merge_cells(f"G{u}:G{l}")
        ws03[f"G{u}"].fill = fill_arrow

    row += max(max_input_rows + 2, 10) 



######## ---------------------------------------------------------------------

ws41 = wb["Fr-04.1 (2)"]
fill_sum = PatternFill(start_color='FF808080', end_color='FF808080', fill_type='solid') 
r_start = 11
row = 11
# phase=["การได้มาของวัตถุดิบ","การผลิต","การกระจายสินค้า","การใช้งาน","การจัดการซาก"]
phase = ["การได้มาของวัตถุดิบ", "การผลิต", "การกระจายสินค้า", "การใช้งาน", "การจัดการซาก"]
for i in range(len(phase)):
    phase_start_row = row  # เก็บแถวเริ่มต้นของ phase นี้

    for j in range(len(form41[i]["process"])):
        process = form41[i]["process"][j]
        process_start_row = row  # เก็บแถวเริ่มต้นของ process นี้

        if i < 2:
            ws41[f"B{row}"] = process["process_name"]
            ws41[f"B{row}"].font = Font(name="Tahoma", size=10, bold=True, color="FF0070C0", italic=True)
            row += 1

        for k in range(len(process["product"])):
            product = process["product"][k]

            if i == 1:
                ws41[f"B{row}"] = product["production_class"]
                ws41[f"B{row}"].font = Font(name="Tahoma", size=10, bold=True, color="FF99004c", italic=True)
                row += 1

            for l in range(len(product["items"])):
                items = product["items"][l]
                ws41[f"B{row}"] = items["item_name"]
                ws41[f"C{row}"] = items["item_unit"]
                ws41[f"D{row}"] = items["item_quantity"]
                ws41[f"F{row}"] = items["lci_source_period"]
                ws41[f"G{row}"] = items["ef"]
                exec(check_source_form4_1(items["ef_source"], row))
                ws41[f"O{row}"] = items["ef_source_ref"]
                ws41[f"P{row}"] = items["ratio"]
                ws41[f"Q{row}"] = items["ghg_emission"]
                ws41[f"R{row}"] = items["ghg_emission_proportion"]
                ws41[f"S{row}"] = items["cut_off"]
                ws41[f"T{row}"] = items["description"]
                row += 1  # ขยับแถวสำหรับ item ถัดไป

        # หลังจบแต่ละ process ให้เว้น 1 แถว
        row += 1

    # เติมสีสรุป process
    for row_cells in ws41[f"B{row}:T{row}"]:
        for cell in row_cells:
            cell.fill = fill_sum
    row += 1

    # Merge phase column และใส่ชื่อ phase
    ws41.merge_cells(f"A{phase_start_row}:A{row-1}")
    ws41[f"A{phase_start_row}"] = phase[i]

    r_start = row  # อัปเดต r_start สำหรับ phase ถัดไป


######## ---------------------------------------------------------------------

ws42 = wb["Fr-04.2 (2)"]
fill_sum = PatternFill(start_color='FF808080', end_color='FF808080', fill_type='solid') 
r_start = 12
row = 12
phase = ["การได้มาของวัตถุดิบ", "การผลิต", "การกระจายสินค้า", "การใช้งาน", "การจัดการซาก"]
for i in range(len(phase)):
    phase_start_row = row  # เก็บแถวเริ่มต้นของ phase นี้

    for j in range(len(form42[i]["process"])):
        process = form42[i]["process"][j]
        process_start_row = row  # เก็บแถวเริ่มต้นของ process นี้

        if i < 2:
            ws42[f"B{row}"] = process["process_name"]
            ws42[f"B{row}"].font = Font(name="Tahoma", size=10, bold=True, color="FF0070C0", italic=True)
            row += 1

        for k in range(len(process["product"])):
            product = process["product"][k]

            if i == 1:
                ws42[f"B{row}"] = product["production_class"]
                ws42[f"B{row}"].font = Font(name="Tahoma", size=10, bold=True, color="FF99004c", italic=True)
                row += 1

            for l in range(len(product["items"])):
                items = product["items"][l]
                ws42[f"B{row}"] = items["item_name"]
                ws42[f"C{row}"] = items["item_unit"]
                ws42[f"D{row}"] = items["item_fu_qty"]
                ws42[f"E{row}"] = items["distance"]
                ws42[f"F{row}"] = items["distance_source"]
                ws42[f"G{row}"] = items["type1_gas"]
                ws42[f"H{row}"] = items["type1_gas_unit"]
                ws42[f"I{row}"] = items["type1_gas_qty"]
                ws42[f"J{row}"] = items["type1_ef"]
                exec(check_source_form4_2_T1(items["type1_ef_source"], row, ws_name='ws42'))
                ws42[f"M{row}"] = items["type2_outbound_load"]
                ws42[f"N{row}"] = items["type2_return_load"]
                ws42[f"O{row}"] = items["type2_vehicle"]
                ws42[f"P{row}"] = items["type2_outbound_load_percent"]
                ws42[f"Q{row}"] = items["type2_return_load_percent"]
                ws42[f"R{row}"] = items["type2_outbound_ef"]
                ws42[f"S{row}"] = items["type2_return_ef"]
                exec(check_source_form4_2_T2(items["type2_ef_source"], row, ws_name='ws42'))
                ws42[f"V{row}"] = items["type2_ef_source_ref"]
                ws42[f"W{row}"] = items["ratio"]
                ws42[f"X{row}"] = items["transport_emission"]
                ws42[f"Y{row}"] = items["cut_off"]
                ws42[f"Z{row}"] = items["add_on_detail"]
                row += 1  # ขยับแถวสำหรับ item ถัดไป

        # หลังจบแต่ละ process ให้เว้น 1 แถว
        row += 1

    # เติมสีสรุป process
    for row_cells in ws42[f"B{row}:T{row}"]:
        for cell in row_cells:
            cell.fill = fill_sum
    row += 1

    # Merge phase column และใส่ชื่อ phase
    ws42.merge_cells(f"A{phase_start_row}:A{row-1}")
    ws42[f"A{phase_start_row}"] = phase[i]

    r_start = row  # อัปเดต r_start สำหรับ phase ถัดไป

######## -----------save----------------------------------------------------------
wb.save(output_path)
print(output_path)