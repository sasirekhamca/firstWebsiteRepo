                
document.querySelector("#myForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    alert(`Hello, ${name}!`);
       
  });
  
 