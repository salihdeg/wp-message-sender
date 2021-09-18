# -*- coding: UTF-8 -*-
from numpy import unicode_
import pywhatkit as pkit
from Business import fileReader
from Entities import contact

wait_time = 5
tab_close = True
close_time = 2


def send_message_immediately(contacts_file_path, message):
    fileReader.save_contacts_from_file(contacts_file_path)
    # Create List Of Contact
    contacts = []
    for index in range(0, len(fileReader.contacts)):
        contacts.append(contact.Contact(fileReader.names[index], fileReader.numbers[index]))

    for c in contacts:
        pkit.sendwhatmsg_instantly(f"+90{c.number}", message, wait_time, tab_close, close_time)


def send_timed_message(contacts_file_path, message, time_hour, time_minute):
    fileReader.save_contacts_from_file(contacts_file_path)
    #Contact List
    contacts = []
    for i in range(0, len(fileReader.contacts)):
        contacts.append(contact.Contact(fileReader.names[i], fileReader.numbers[i]))

    for c in contacts:
        pkit.sendwhatmsg(f"+90{c.number}", message, time_hour, time_minute, wait_time, tab_close, close_time)
