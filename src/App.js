import './App.css';
import { Component } from 'react';

class App extends Component{
    state = {
      posts: []
    }

  loadPosts = async ()=> {
    const postsResponse =  fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse= fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post,index)=>{
      return { ...post, cover: photosJson[index].url }
    });

    this.setState({posts : postsAndPhotos});
  }

  // Monta os dados após uma atualização
  componentDidUpdate(){}
  
  // Monta o componente após os dados serem carregados.
  componentDidMount(){      
   this.loadPosts();
  }

  // Após sair da tela os dados são desmontados para impedir que algo que n esteja na tela continue sendo carregado por trás dos panos
  componentWillUnmount(){}

  render(){

    const {posts} = this.state;

    return (
      <section className='container'>
        <div className = "posts"> 
          {posts.map(post =>
            <div className='post'>
              <img src={post.cover} alt={post.title} />
              <div key={post.id} className='post-content'> 
                <h1> 
                  {post.title} 
                </h1> 
                <p> 
                  {post.body} 
                </p> 
              </div>
            </div>
          )} 
        </div>
      </section>
    );
  }
}

export default App;