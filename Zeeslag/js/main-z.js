const youtubeAccount = {
    user: 'The Diddler',
    content: 'hallo allemaal',
    videoAge: '2 dagen geleden',
    likes: 20,
    like: function () {
        console.log('je hebt geliked');
        this.likes++;  
    },
    subscribers: 100,
    subscribe: function() {
        console.log('je bent subscribed bij ' + this.user);  
        this.subscribers++;  
    },
};

const subscribersContainer = document.getElementById('subscribersContainer'); 


subscribersContainer.innerHTML += `<div>
    <p>${youtubeAccount.content}</p>
    <button class='like-btn'> like video</button>
</div>`;

const buttons = document.querySelectorAll('.like-btn');


for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener('click', function () {
        youtubeAccount.like(); 
    });
}
