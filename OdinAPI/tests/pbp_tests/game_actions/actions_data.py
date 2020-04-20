data = {
    "valid_notification": {
        "event_id": 28,
        "data": {
            "action_type": "Notification",
            "message": "This is a test notification. Hopefully it works."
        }
    },
    "non_existing_event_notification": {
        "event_id": 99999,
        "data": {
            "action_type": "Notification",
            "message": "This is a test notification. Hopefully it works."
        }
    },
    "non_valid_id_notification": {
        "event_id": "INVALID_EVENT",
        "data": {
            "action_type": "Notification",
            "message": "This is a test notification. Hopefully it works."
        }
    },
    "more_params_notification": {
        "event_id": 28,
        "data": {
            "action_type": "Notification",
            "message": "This is a test notification. Hopefully it works.",
            "other": "UNNECESSARY_CONTENT"
        }
    },
    "message_limit_notification": {
        "event_id": 28,
        "data": {
            "action_type": "Notification",
            "message": '''This is a test notification. Hopefully it works. 
                            This is a test notification. Hopefully it works. 
                            This is a test notification. Hopefully it works. 
                            This is a test notification. Hopefully it works. 
                            This is a test notification. Hopefully it works.
                        '''
        }
    },
    "valid_scoring_uprm": {
        "event_id": 28,
        "data": {
            "action_type": "KillPoint",
            "team": "uprm",
            "athlete_id": 110
        }
    },
    "valid_scoring_opp": {
        "event_id": 28,
        "data": {
            "action_type": "KillPoint",
            "team": "opponent",
            "athlete_id": 1587365468141
        }
    },
    "valid_personal_uprm": {
        "event_id": 28,
        "data": {
            "action_type": "Assist",
            "team": "uprm",
            "athlete_id": 110
        }
    },
    "valid_personal_opp": {
        "event_id": 28,
        "data": {
            "action_type": "Assist",
            "team": "opponent",
            "athlete_id": 1587365468141
        }
    },
    "valid_error_uprm": {
        "event_id": 28,
        "data": {
            "action_type": "AttackError",
            "team": "uprm",
            "athlete_id": 110
        }
    },
    "valid_error_opp": {
        "event_id": 28,
        "data": {
            "action_type": "AttackError",
            "team": "opponent",
            "athlete_id": 1587365468141
        }
    },
    "more_params_play": {
        "event_id": 28,
        "data": {
            "action_type": "AttackError",
            "team": "opponent",
            "athlete_id": 1587365468141,
            "SOMETHING": "YEP SOMETHING...."
        }
    },
    "invalid_action_play": {
        "event_id": 28,
        "data": {
            "action_type": "SOMETHING",
            "team": "opponent",
            "athlete_id": 1587365468141,
        }
    },

    "valid_adjust": {
        "event_id": 28,
        "data": {
            "action_type": "ScoreAdjust",
            "team": "opponent",
            "difference": 5,
        }
    },
    "valid_to_remove": {
        "event_id": 28,
        "action_id": 25
    },
    "invalid_pbp_to_remove1": {
        "event_id": 9999,
        "action_id": 25
    },
    "invalid_pbp_to_remove2": {
        "event_id": 28,
        "action_id": 9999
    }
}