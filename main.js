const slide_box = document.querySelector("div#slide_box"); // a box dos slides

const show_slide_bnt = document.querySelector("button#show_slide"); // o botão que mostra o slide
const hide_slide_bnt = document.querySelector("button#close_slide_box"); // botão que esconde o slide

function show_slide(visibility) { // faz aparecer os slides (true se devem aparecer)
    slide_box.style.opacity = visibility? 1 : 0;

    setTimeout(() => slide_box.style.visibility = visibility? "visible" : "hidden", visibility? 0 : 400);
}

// eventos

show_slide_bnt.addEventListener("click", () => show_slide(true)); // atribui o evento show slide false ao botão
hide_slide_bnt.addEventListener("click", () => show_slide(false)); // atribui o evento show sllide true ao botão