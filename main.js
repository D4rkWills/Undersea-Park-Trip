const slide_box = document.querySelector("div#slide_box"); // a box dos slides
const img_list = document.querySelector("div#img_list"); // o elemento que contém as imagens

const slides = document.querySelectorAll("div#img_list img"); // os slides
const slide_tags = document.querySelectorAll("div#img_list div.img_tag"); // as tags de cada slide

const show_slide_bnt = document.querySelector("button#show_slide"); // o botão que mostra o slide
const hide_slide_bnt = document.querySelector("button#close_slide_box"); // botão que esconde o slide

///////////////////////////////////////////////////////////////////////////////


const img_id = [3, 1, 2];


///////////////////////////////////////////////////////////////////////////////

function show_slide(visibility) { // faz aparecer os slides (true se devem aparecer)
    slide_box.style.opacity = visibility? 1 : 0;

    setTimeout(() => slide_box.style.visibility = visibility? "visible" : "hidden", visibility? 0 : 400);
}

function nextSlide(dir) { // passa para o próximo slide
    let img_id_copy = img_id.slice(); // cópia de img_list

    slides.forEach(slide => { // animação inicial (antes da troca)
        slide.style.maxWidth = "50%";

        setTimeout(() => {
            slide.style.opacity = "0";
            slide.style.left = ((slide.width + slide.width / 2) * ((dir == "right")? -1 : 1)).toString() + "px";
        }, 200);
    });

    // faz a troca

    if (dir == "right") {
        for (let i = img_id.length - 1; i >= 0; i--) {
            img_id[i] = (img_id_copy[i + 1])? img_id_copy[i + 1] : img_id_copy[0];
        }
    } else {
        for (let i = 0; i < img_id.length; i++) {
            img_id[i] = (i - 1 >= 0)? img_id_copy[i - 1] : img_id_copy[img_id.length - 1];
        }
    }

    setTimeout(() => {
        slides.forEach((slide, i) => {
            slide.src = "imgs/slide" + img_id[i].toString() + ".png";
            slide_tags[i].innerHTML = img_id[i].toString();
        });
    }, 400);

    slides.forEach(slide => { // animeção de retorno 
        setTimeout(() => {
            slide.style.transition = "none"; // reseta todas as transições antes de voltar

            slide.style.left = "0px";
            slide.style.opacity = "1";

            if (slide.id == "s2") {
                slide.style.maxWidth = "60%";
            };

            setTimeout(() => slide.style.transition = "max-width 0.1s, left 0.4s, opacity 0.4s", 100);
        }, 600);
    });
}

// eventos

show_slide_bnt.addEventListener("click", () => show_slide(true)); // atribui o evento show slide false ao botão
hide_slide_bnt.addEventListener("click", () => show_slide(false)); // atribui o evento show sllide true ao botão

img_list.addEventListener("click", event => {
    if (event.x > img_list.clientWidth / 2) { // animação para a esquerda
        nextSlide("right");
    } else { // para a direita
        nextSlide("left");
    }
}); // atribui o evento click ao slide box