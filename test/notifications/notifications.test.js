// We will have an array of notifications sorted with time being sent to the user
/** 
 * When user sends a request to chat, a notification is sent to the other user.
 * This means my user obj will have a notification array, where new notifications are pushed to that array.
 * This means when there is a change, a notification is added to my array and at the same time sent to the user.
 * 
 Then when the user mounts on the component, we send a request to the server to fetch all the Notifications.

 This means, we will have a collection for notifications, a notification array.

 for now, we are just creating a notification or fetching them.

 tomorrow, add the fetch for notification and sendin messages too
*/
