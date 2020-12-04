from .config.fb_config import serv_path, rtdb_config
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from time import time

class NotificationDAO:
    def __init__(self):
        if not firebase_admin._apps:
            firebase_admin.initialize_app(
                credentials.Certificate(serv_path), rtdb_config)
        self._rtdb = db.reference('notification-tokens')
        
    def get_all_notification_tokens(self):
        tokens = self._rtdb.get()
        result = []
        for deviceId in tokens:
            result.append({"deviceId": deviceId, "token": tokens[deviceId]})
        return result
