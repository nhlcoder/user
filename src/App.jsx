import { useState } from "react";

const storage = {
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key))
  }
}

function App() {
  const [stores, setStores] = useState(storage.get('user') ?? []);

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const [editEmail, setEditEmail] = useState('');
  const [editUserName, setEditUserName] = useState('');
  const [isEdit, setIsEdit] = useState(false);


  const handleAdd = () => {
    const nomalEmail = email.toUpperCase();
    if(!stores.some( store => store.email.toUpperCase() === nomalEmail)){
      setStores( prev => {
        if(email){
          storage.set('user', [...prev, {email, userName}])
          return [...prev, {email, userName}]
        }else{
          return prev;
        }
      });
      setEmail('');
      setUserName('');
    }else{
      alert('Email Invalid');
    }
  }

  const handleDetele = email => {
    const afterDelete = stores.reduce((acc, store) => {
      if(store.email !== email){
        acc.push(store);
      }
      return acc;
    },[])
    setStores(afterDelete);
    storage.set('user', afterDelete)
  }

  const handleEdit = (email, userName) => {
    setEditEmail(email);
    setEditUserName(userName);
    setIsEdit(true);
  }

  const handleEditSave = () => {
    const afterEdit = stores.map( store => {
      if(store.email === editEmail){
        return {...store, email: editEmail, userName: editUserName}
      }else{
        return store
      }
    });
    setStores(afterEdit);
    storage.set('user', afterEdit);
    setIsEdit(false);

  }

  return (
    <div style={{ padding: 32}}>
      <div>
        <input
          placeholder={'abc@gmail.com'}
          type={'text'}
          value={email}
          onChange={ e => setEmail(e.target.value)}
        />
        <input
          placeholder={'User name'}
          type={'text'}
          value={userName}
          onChange={ e => setUserName(e.target.value)}
        />
        <button onClick={handleAdd}>Enter...</button>
      </div>
      <div>
        <ul>
          {
            stores.map( (store, index) => (
              <div key={index}>
                {
                  editEmail === store.email && isEdit?
                  (
                    <>
                      <input
                        disabled
                        value={editEmail}
                        onChange={ e => setEditEmail(e.target.value)}
                      />
                      <input
                        value={editUserName}
                        onChange={ e => setEditUserName(e.target.value)}
                      />
                      <button onClick={handleEditSave}>Save</button>
                    </>
                  ):(
                    <>
                      <li>{"Email: "+store.email}</li>
                      <li>{"User name: "+store.userName}</li>
                      <button onClick={() => handleEdit(store.email, store.userName)}>Edit</button>
                    </>
                  )
                }
                <button onClick={() => handleDetele(store.email)}>Delete</button>
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
