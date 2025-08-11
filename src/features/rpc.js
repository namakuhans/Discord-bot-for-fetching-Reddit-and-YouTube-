// src/features/rpc.js
module.exports = (client) => {
    const activities = [
        {
            details: 'Monitoring Reddit & YouTube',
            state: 'Stay updated with new posts',
            largeImageKey: 'reddit_logo',  // Pastikan ada di aset aplikasi Discord
            largeImageText: 'Reddit Feed',
            smallImageKey: 'youtube_logo', // Pastikan ada di aset aplikasi Discord
            smallImageText: 'YouTube Feed',
            type: 0 // Playing
        },
        {
            details: 'Your community updates',
            state: 'Bringing latest content to Discord',
            largeImageKey: 'discord_logo',
            largeImageText: 'Discord Bot',
            smallImageKey: 'live_icon',
            smallImageText: 'Live Updates',
            type: 3 // Watching
        }
    ];

    let index = 0;

    const setActivity = () => {
        const activity = activities[index];
        client.user.setActivity({
            name: activity.details,
            state: activity.state,
            type: activity.type,
            assets: {
                large_image: activity.largeImageKey,
                large_text: activity.largeImageText,
                small_image: activity.smallImageKey,
                small_text: activity.smallImageText
            }
        });
        index = (index + 1) % activities.length;
    };

    // Set activity pertama kali
    setActivity();

    // Ganti activity setiap 15 detik
    setInterval(setActivity, 15000);
};
