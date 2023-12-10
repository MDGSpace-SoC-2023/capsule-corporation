function add(){
     
    let n_clues = document.getElementById('n_clues').value;
    let container = document.getElementById('input-container');
    let form = document.getElementById('form');
    form.style.height = "30rem";  
    let signin = document.getElementById('signin');
    signin.style.height = "40rem";  

    container.innerHTML = ''; // Clear the container
    let text = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < n_clues; i++) {
        let input1 = document.createElement('input');
        input1.className = 'clue';
        input1.placeholder = 'Clue ' + (i + 1);
        input1.type = 'text';
        input1.name = 'Clue';
        container.appendChild(input1);
        let input2 = document.createElement('input');
        input2.className = 'location';
        input2.placeholder = 'Location ' + (i + 1);
        input2.type = 'text';
        input2.name = 'Location';
        container.appendChild(input2);
        let input3 = document.createElement('input');
        input3.className = 'hint';
        input3.type = 'text';
        input3.placeholder = 'Hint ' + (i + 1);
        input3.name ='Hint' ;
        container.appendChild(input3);
    }
    let btn = document.createElement("button");
    btn.innerHTML = "Save";
    container.appendChild(btn);
    btn.className = "dom-btn";

    // let div = document.createElement('div'); // Create a div element
    // div.className = 'signin'; 
    // div.appendChild(); // Append the input to the div


}