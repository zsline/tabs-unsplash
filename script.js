
// const CLIENT_ID = 'ttnbMSg68f8WaFbvW0XkVMvoE2MdGshg9OcBbo6xcUg';
const CLIENT_ID = 'vTQoW1XXKwJoRcbs5JVbqlQewLB7IXZm28We7PNoJe4';
let query = localStorage.getItem('query');

const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=5&query=${query}&orientation=landscape`;
const slider = document.getElementById('slider');
let state = [];
let currentSlide;
const fetchPhoto = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            // console.log(data);
            state = data;
            currentSlide = state[0].id;
            console.log(data);

            setPhotos();
        }
    }
    catch (err) {
        console.log(err);
    }
};

const renderItem = () => {
    return state.map(({ urls: { regular }, user: { name, username }, views, links: { html }, id }) => {
        const isActive = currentSlide === id ? 'active' : "";
        return `<div class="slide ${isActive}" style="background-image:url(${regular})">
        <div class="slide__text">
            <span>Фото:</span>
            ${name} (@${username})
            <div>Просмотров: ${views} </div>
            <a href="${html}" target="blank">Посмотреть на Unsplash</a>
        </div>
        
    </div>`
    }).join("");
};
const handleClick = ({ currentTarget }) => {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
        slide.classList.remove('active')
    });
    currentTarget.classList.add('active');
}

const setPhotos = () => {
    slider.innerHTML = renderItem();

    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
        slide.addEventListener('click', handleClick);
    });

};

const search = document.querySelector('.slider__input');
search.addEventListener('change', function () {
    localStorage.setItem('query', search.value);

    document.location.reload();
});

document.querySelector('.slider__btn').onclick = fetchPhoto;
fetchPhoto();