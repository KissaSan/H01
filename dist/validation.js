"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateVideoInputModel = exports.validateCreateVideoInputModel = void 0;
const enum_1 = require("./enum");
function validateCreateVideoInputModel(data) {
    const { title, author, availableResolutions, } = data;
    const errors = [
        validateTitle(title),
        validateAuthor(author),
        validateAvailableResolutions(availableResolutions)
    ].filter(e => e !== null);
    if (errors.length) {
        return {
            errorsMessages: errors
        };
    }
    return null;
}
exports.validateCreateVideoInputModel = validateCreateVideoInputModel;
function validateUpdateVideoInputModel(data) {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = data;
    const errors = [
        validateTitle(title),
        validateAuthor(author),
        validateAvailableResolutions(availableResolutions),
        validateCanBeDownloaded(canBeDownloaded),
        validateMinAgeRestriction(minAgeRestriction),
        validatePublicationDate(publicationDate)
    ].filter(e => e !== null);
    if (errors.length) {
        return {
            errorsMessages: errors
        };
    }
    return null;
}
exports.validateUpdateVideoInputModel = validateUpdateVideoInputModel;
function validateCanBeDownloaded(canBeDownloaded) {
    if (typeof canBeDownloaded !== "boolean") {
        return {
            field: "canBeDownloaded",
            message: "canBeDownloaded must be boolean "
        };
    }
    return null;
}
function validateMinAgeRestriction(minAgeRestriction) {
    if (minAgeRestriction === null) {
        return null;
    }
    if (typeof minAgeRestriction !== "number") {
        return {
            field: "minAgeRestriction",
            message: "minAgeRestriction must be number "
        };
    }
    if (minAgeRestriction > 18 || minAgeRestriction < 1) {
        return {
            field: "minAgeRestriction",
            message: "minAgeRestriction must be between 1 and 18"
        };
    }
    return null;
}
function validatePublicationDate(publicationDate) {
    if (typeof publicationDate !== "string") {
        return {
            field: "publicationDate",
            message: "publicationDate must be string "
        };
    }
    if (!Date.parse(publicationDate)) {
        return {
            field: "publicationDate",
            message: "publicationDate must be date in ISO string format "
        };
    }
    return null;
}
function validateTitle(title) {
    if (typeof title !== "string") {
        return {
            field: "title",
            message: "title must be string "
        };
    }
    if (title.length > 40) {
        return {
            field: "title",
            message: "title must be less then 40 "
        };
    }
    return null;
}
function validateAuthor(author) {
    if (typeof author !== "string") {
        return {
            field: "author",
            message: "author must be string "
        };
    }
    if (author.length > 20) {
        return {
            field: "author",
            message: "author must be less then 20 "
        };
    }
    return null;
}
function validateAvailableResolutions(availableResolutions) {
    if (availableResolutions === null) {
        return null;
    }
    if (!(Array.isArray(availableResolutions) &&
        availableResolutions.every(r => typeof r == "string"))) {
        return {
            field: "availableResolutions",
            message: "availableResolutions must be array of strings "
        };
    }
    if (availableResolutions.every(r => enum_1.Resolutions[r] !== undefined)) {
        return null;
    }
    else {
        return {
            field: "availableResolutions",
            message: "availableResolutions must be array of Resolutions "
        };
    }
}
