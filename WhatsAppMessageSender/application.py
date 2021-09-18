# -*- coding: UTF-8 -*-
import sys, json
from Business import messageSender

# messageSender.send_message_immediately(f"F:\contacts.xlsx", "Deneme mesajı");

data = sys.stdin.readlines()
data = json.loads(data[0])
path = data[0]['path']
message = data[0]['message']
# print("Pyhton Message-> " + message)
messageSender.send_message_immediately(path, message);
sys.stdout.flush()
