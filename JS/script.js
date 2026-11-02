
// Mandy's Saloon - All JavaScript Features - ST20527098

// 1. Accordion - About Us Page
document.addEventListener('DOMContentLoaded', function(){
  const acc = document.querySelectorAll('.accordion-btn');
  acc.forEach(btn => {
    btn.addEventListener('click', function(){
      this.classList.toggle('active');
      let panel = this.nextElementSibling;
      if(panel.style.display === 'block'){
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  });
});

// 2. Lightbox Gallery - Gallery Page
let slideIndex = 1;
function openModal(){
  document.getElementById('myModal').style.display = 'block';
}
function closeModal(){
  document.getElementById('myModal').style.display = 'none';
}
function currentSlide(n){
  openModal();
  showSlides(slideIndex = n);
}
function plusSlides(n){
  showSlides(slideIndex += n);
}
function showSlides(n){
  let slides = document.getElementsByClassName('mySlides');
  if(slides.length === 0) return;
  if(n > slides.length){ slideIndex = 1 }
  if(n < 1){ slideIndex = slides.length }
  for(let i=0; i<slides.length; i++){
    slides[i].style.display = 'none';
  }
  slides[slideIndex-1].style.display = 'block';
  let img = slides[slideIndex-1].querySelector('img');
  if(img){
    document.getElementById('caption').innerHTML = img.alt + '<br>' + slideIndex + ' / ' + slides.length;
  }
}

// 3. Interactive Map - Home Page - Leaflet API
if(document.getElementById('map')){
  const map = L.map('map').setView([-26.047, 28.044], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: 'Mandys Saloon'
  }).addTo(map);
  L.marker([-26.047, 28.044]).addTo(map).bindPopup("<b>Mandy's Saloon</b><br>Rosebank").openPopup();
}

// 4. Dynamic Search - Services Page
function filterServices(){
  let input = document.getElementById('searchInput').value.toLowerCase();
  let rows = document.querySelectorAll('.service-table tr');
  rows.forEach((row, i) =>{
    if(i===0) return;
    let text = row.textContent.toLowerCase();
    row.style.display = text.includes(input) ? '' : 'none';
  });
}

// 5. Enquiry Form - Book-appointment Page
function processEnquiry(e){
  e.preventDefault();
  document.querySelectorAll('.error').forEach(el=> el.textContent='');
  let valid = true;
  let name = document.getElementById('enqName').value;
  let email = document.getElementById('enqEmail').value;
  let service = document.getElementById('enqService').value;
  let date = document.getElementById('enqDate').value;
  if(name.length < 3){
    document.getElementById('enqNameError').textContent = 'Name min 3 chars';
    valid = false;
  }
  if(!/^\S+@\S+\.\S+$/.test(email)){
    document.getElementById('enqEmailError').textContent = 'Valid email required';
    valid = false;
  }
  if(!service){
    document.getElementById('enqServiceError').textContent = 'Select service';
    valid = false;
  }
  if(!date){
    document.getElementById('enqDateError').textContent = 'Select date';
    valid = false;
  }
  if(!valid) return false;
  let parts = service.split('|');
  let sName = parts[0];
  let sPrice = parts[1];
  let resp = document.getElementById('enquiryResponse');
  resp.style.display = 'block';
  resp.innerHTML = `<h3>Thank you ${name}!</h3><p><b>Service:</b> ${sName}<br><b>Estimated Cost:</b> R${sPrice}<br><b>Date:</b> ${date}<br><b>Availability:</b> <span style="color:green;">Available at 10:00 & 14:00</span><br>We will confirm via email within 2 hours.</p>`;
  return false;
}

// 6. Contact Form - Contact Page - Recipient in code
function processContact(e){
  e.preventDefault();
  document.querySelectorAll('.error').forEach(el=> el.textContent='');
  let valid = true;
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;
  if(name.length < 3){
    document.getElementById('nameError').textContent = 'Name min 3 chars';
    valid = false;
  }
  if(!/^\S+@\S+\.\S+$/.test(email)){
    document.getElementById('emailError').textContent = 'Valid email';
    valid = false;
  }
  if(message.length < 10){
    document.getElementById('messageError').textContent = 'Message min 10 chars';
    valid = false;
  }
  if(!valid) return false;
  let resp = document.getElementById('contactResponse');
  resp.style.display = 'block';
  resp.innerHTML = `<p><b>Email compiled and sent</b><br>To: mandy@mandyssaloon.co.za (recipient in code)<br>From: ${email}<br>Subject: ${document.getElementById('subject').value}<br>Message: ${message}<br><br><strong style="color:green;">Status: Sent Successfully! We reply within 2 hours.</strong></p>`;
  return false;
}