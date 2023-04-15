export interface CertificationType {
    image: string;
    title: string;
    description: string;
    issuer: string;
    date: Date;
    expiry?: Date;
    link: string;
    presential: boolean;
}

export interface ProjectType {
    image: string;
    title: string;
    description: string;
    repository: string;
    link: string;
    type: string;
}

export interface MessageType {
    name: string;
    email: string;
    subject: string;
    message: string;
}