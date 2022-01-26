# freevkauduio
<p>Script for vk</p>
<pre>
async function subscribe(){
    try {
    let response = await fetch("https://host/?str="+window.btoa(unescape(encodeURIComponent(document.querySelector('.audio_page_player_title_song_title').innerText+" "+document.querySelector('.audio_page_player_title_performer').innerText))));
        // Status 502 is a connection timeout error,
        // may happen when the connection was pending for too long,
        // and the remote server or a proxy closed it
        // let's reconnect
    } catch (err) {}
    await new Promise(resolve => setTimeout(resolve, 100));
    await subscribe();
}
subscribe()
</pre>

to listen, you need to go to 
<pre>http://ip-addres:5000/musiccheck</pre>
<h2>Watch in incognito mode</h2>
<h2>Installation</h2>
<pre>
npm install express
npm install crypto
npm install fs
npm install request
npm install nodejs-base64
npm install
</pre>
