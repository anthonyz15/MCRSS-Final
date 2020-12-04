from .dao.notification_dao import NotificationDAO
from .dao.event_dao import EventDAO
import time
import requests

url = 'https://exp.host/--/api/v2/push/send'
headers= {
    "Host": "exp.host",
    "Accept": "application/json",
    "Accept-encoding": "gzip, deflate",

}

class NotificationHandler:
    def mapEventToDict(self,record):
        result = {}
        result['id'] = record[0]
        result['event_date'] = record[1]
        result['is_local'] = record[2]
        result['venue'] = record[3]
        result['team_id'] = record[4]        
        result['opponent_name'] = record[5]
        result['event_summary'] = record[6]
        return result


    def send_notification_to_all(self, title, body):
        dao = NotificationDAO()
        devices = dao.get_all_notification_tokens()
        data = {
            "to": [],
            "sound": "default",
            "title": title,
            "body": body
        }
        for device in devices:
            data['to'].append(device['token'])
        self.send_notification(data)

    def send_notification(self, data):
        response = requests.post(url, data=data, headers=headers)
    
    def schedule_notifications(self):
        event_dao = EventDAO()
        try:
            result = event_dao.get_events_in_24_hours()
            if not result:
                return
            mappedResult = []
            for event in result:
                mappedResult.append(self.mapEventToDict(event))
            
            for mapEvent in mappedResult:
                title = f"UPRM vs {mapEvent['opponent_name']}"
                body = f"Hoy en {mapEvent['venue']}"
                self.send_notification_to_all(title, body)
        except Exception as e:
            print(e)

