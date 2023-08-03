export const appearProductAnimation=()=>{
    const cards=document.querySelectorAll('.product__box__card');
    window.addEventListener('scroll', ()=>{
       cards.forEach(card=>{
        const rect = card.getBoundingClientRect();
        const offset = window.innerHeight-(rect.bottom*0.8);
  
        if (offset > 0) card.classList.add('appear')
        else card.classList.remove('appear')
       })
    })
}