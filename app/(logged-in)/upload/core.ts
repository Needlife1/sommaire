import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing } from "uploadthing/next";
import { UploadThingError, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
        .middleware(async () => {
            const user = await currentUser();

            if (!user) throw new UploadThingError('Unauthorized');

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log('Upload complete for user id:', metadata.userId);
            console.log('File url:', file);

            return {
                userId: metadata.userId,
                fileUrl: file.url,
                fileName: file.name,
            };
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;