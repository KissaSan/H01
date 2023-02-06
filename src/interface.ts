export interface Video {
    id: number;
    title:string;
    author:string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt:string;
    publicationDate:string;
    availableResolutions: string[] | null
}

export interface UpdateVideoInputModel {
    title:string;
    author:string;
    availableResolutions: string[] | null
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate:string;
}
export interface CreateVideoInputModel {
    title:string;
    author:string;
    availableResolutions: string[] | null
}

export interface APIErrorResult {
    errorsMessages: FieldError[] | null;
}

export interface FieldError {
    message: string | null;
    field: string | null;
}