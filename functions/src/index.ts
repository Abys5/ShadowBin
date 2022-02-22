import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

export const onDailyCheckExpiredTrash = functions.pubsub
    .schedule("every day")
    .onRun(async (context) => {
        console.log("Daily Check Expired Trash");
        const batch = admin.firestore().batch();
        const trashItems = await admin
            .firestore()
            .collection("trash")
            .where("expiresAt", "<", new Date())
            .get();
        trashItems.forEach((trash) => {
            console.log("Expired Trash:", trash.id);
            batch.delete(trash.ref);
        });
        return batch.commit();
    });
