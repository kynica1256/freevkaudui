# freevkauduio
<pre>
async function subscribe(){
    let response = await fetch("http://ip-addres:3000/?str="+window.btoa(unescape(encodeURIComponent(document.querySelector('.audio_page_player_title_song_title').innerText+" "+document.querySelector('.audio_page_player_title_performer').innerText))));
        // Status 502 is a connection timeout error,
        // may happen when the connection was pending for too long,
        // and the remote server or a proxy closed it
        // let's reconnect
    await new Promise(resolve => setTimeout(resolve, 10000));
    await subscribe();
}
subscribe()
</pre>
