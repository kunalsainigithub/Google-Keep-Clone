const addButton = document.querySelector('#add');


const updateLocalStorageData = () =>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    //individual data or characters ko add krna hai , so 
    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    console.log(notes);

    //localstorage me add krna hai
    localStorage.setItem('notes',JSON.stringify(notes));
} 


const addNewNode = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea> `;

        note.insertAdjacentHTML('afterbegin',htmlData);
        //console.log(note);
 

        // getting the referrences
        const editButton = note.querySelector('.edit');
        const delButton = note.querySelector('.delete');
        const mainDiv = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        // deleting the node
        delButton.addEventListener('click',()=>{
            note.remove();
            updateLocalStorageData();
        })


        // Toggle using edit button
        
        //dono jagha pr same data add krke rakh sako
        textArea.value = text;
        mainDiv.innerHTML = text;


        editButton.addEventListener('click',() => {
            mainDiv.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        })

        textArea.addEventListener('change',(event)=>{
            const value = event.target.value;
            //console.log(value);
            mainDiv.innerHTML = value;

            updateLocalStorageData();
        })


        document.body.appendChild(note);

        // it appends a node as the last child of a node
}

// getting databack from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){notes.forEach((note)=>addNewNode(note)) };


addButton.addEventListener('click', () => addNewNode());