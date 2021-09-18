# -*- coding: UTF-8 -*-
import pandas as pd

contacts = ""
numbers = ""
names = ""


def save_contacts_from_file(file_path):
    global contacts
    global numbers
    global names
    contacts = pd.read_excel(file_path)
    numbers = pd.DataFrame(contacts, columns=['Number']).values.tolist()
    names = pd.DataFrame(contacts, columns=['Name']).values.tolist()
