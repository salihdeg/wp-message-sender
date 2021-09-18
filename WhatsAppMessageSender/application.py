# -*- coding: UTF-8 -*-
import sys, json
from Business import messageSender

# messageSender.send_message_immediately(f"F:\contacts.xlsx", "Deneme mesajı");

data = sys.stdin.readlines()
data = json.loads(data[0])
choose = data[0]['choose']
path = data[0]['path']
message = data[0]['message']

if(choose == 1):
    messageSender.send_message_immediately(path, message);

if(choose == 2):
    time_hour = int(data[0]['timeHour'])
    time_min = int(data[0]['timeMin'])
    messageSender.send_timed_message(path, message, time_hour, time_min)

sys.stdout.flush()
