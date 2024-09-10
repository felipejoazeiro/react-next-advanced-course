import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

class Home extends Component{
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 2
    }

  // Monta os dados após uma atualização
  componentDidUpdate(){}
  
  // Monta o componente após os dados serem carregados.
  async componentDidMount(){      
    await this.loadPosts();
  }

  loadPosts = async ()=>{
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts : postsAndPhotos.slice(page,postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts, page:nextPage});
  }

  // Após sair da tela os dados são desmontados para impedir que algo que n esteja na tela continue sendo carregado por trás dos panos
  componentWillUnmount(){}

  render(){

    const {posts} = this.state;

    return (
      <section className='container'>
        <Posts posts={posts} />
        <Button 
          text="Load more posts"
          onClick={this.loadMorePosts}
        />
      </section>
    );
  }
}

export default Home;