package ssafy.uniqon.service;

import ssafy.uniqon.controller.NotificationController;


public interface NotificationService {

    int registerNotification (NotificationController.registerNotificationWebRequest req);
}
