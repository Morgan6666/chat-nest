"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
const messageConstants_1 = require("./messageConstants");
const messageConstants_2 = require("./messageConstants");
const messageConstants_3 = require("./messageConstants");
class ServiceResponse {
    uniqueServiceErrorRes(success, code, message) {
        return {
            Success: success,
            Message: message,
            Code: code,
        };
    }
    messageSuccessAdded() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.MESSAGE_SUCCESS_ADDED);
    }
    uniqueServiceRes(success, code, message, content) {
        return {
            Success: success,
            Message: message,
            Code: code,
            Content: content,
        };
    }
    socketSuccessUpdated() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.SOCKET_SUCCESS_UPDATED);
    }
    serviceUserError() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_500, messageConstants_1.SERVICE_USER_ERROR);
    }
    userDisconnect() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.USER_DISCONNECT);
    }
    serviceMarketError() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_500, messageConstants_1.SERVICE_MARKET_ERROR);
    }
    messageNotSave() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_500, messageConstants_1.MESSAGE_NOT_SAVE);
    }
    userNotOnline() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.USER_NOT_ONLINE);
    }
    messagesNotFound() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.MESSAGE_NOT_FOUND);
    }
    uniqueSuccessRes(content) {
        return this.uniqueServiceRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.SUCCESS, content);
    }
    roomDoesntExist() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.ROOM_DOESNT_EXIST);
    }
    roomAlreadyExist() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.ROOM_ALREADY_EXIST);
    }
    serviceStorageError() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_500, messageConstants_1.SERVICE_STORAGE_ERROR);
    }
    userDoesntExistInRoom() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.USER_DOESNT_EXIST_IN_ROOM);
    }
    userAddedRoom() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.USER_ADDED_IN_ROOM);
    }
    roomNotFound() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.ROOM_NOT_FOUND);
    }
    userSuccessRemoved() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.USER_SUCCESS_REMOVE);
    }
    userExistsInRoom() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.USER_EXISST_IN_ROOM);
    }
    roomDeleted() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.ROOM_DELETED);
    }
    catelgoriesNotFound() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.CATEGORIES_NOT_FOUND);
    }
    polisSuccessAdded() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.CLIENT_POLIS_SUCCESSFULLY_ADDED);
    }
    passwordMismatch() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.PASSWORD_MISMATCH);
    }
    polisAlreadyExists() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.CLIENT_POLIS_ALREADY_EXISTS);
    }
    documnetsNotFound() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.DOCUMENTS_NOT_FOUND);
    }
    documentsAddSuccessfully() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.DOCUMENTS_ADD_SUCCESSFULLY);
    }
    documentsAlreadyExists() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.DOCUMENTS_ALREADY_EXISTS);
    }
    patientsNotFound() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.PATIENTS_DOESNT_EXISTS);
    }
    userNotFound() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.USER_DOESNT_EXIST);
    }
    passwordSuccessUpdate() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.USER_PASSWORD_SUCCESS);
    }
    userAlreadyExist() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.USER_ALREADY_EXIST);
    }
    userSuccessfulyCreated() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.USER_SUCCESSFULLY_CREATED);
    }
    userNotAuthorisated() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.USER_NOT_AUTHORISATE);
    }
    metaSuccessfulyAdded() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.META_SUCCESSFULLY_ADDED);
    }
    internalServerError() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_500, messageConstants_1.INTERNAL_SERVER_ERROR);
    }
    doctorAlreadyExists() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_403, messageConstants_1.DOCTOR_ALREADY_EXISTS);
    }
    doctorDoesntExists() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_FALSE, messageConstants_2.CODE_404, messageConstants_1.DOCTOR_DOESNT_EXISTS);
    }
    doctorSuccessfulyCreated() {
        return this.uniqueServiceErrorRes(messageConstants_3.SUCCESS_TRUE, messageConstants_1.CODE_200, messageConstants_1.DOCTOR_SUCCESSFULY_CREATED);
    }
}
exports.ServiceResponse = ServiceResponse;
//# sourceMappingURL=ServiceResponse.js.map