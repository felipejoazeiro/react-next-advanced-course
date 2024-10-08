import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPages] = useState(0);
  const [postsPerPage] = useState([10]);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length

  const handleLoadPosts = useCallback(async (page, postsPerPage)=>{
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page,postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(()=>{
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts)
    setPages(nextPage)
  }

  const filteredPosts = !!searchValue ? allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase())
  }): posts;

  const handleChange = (e)=>{
    const {value} = e.target;
    setSearchValue(value)
  }
  
  return (
    <section className='container'>
        <div className="search-container">

          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}  
          <TextInput searchValue={searchValue} handleChange={handleChange}/>
        </div>
        <Posts posts={filteredPosts} />
        <div className="button-container">
          <Button 
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
  )
}

/* class Home2 extends Component{
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 2,
      searchValue: ''
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

  handleChange = (e)=>{
    const {value} = e.target;
    this.setState({searchValue: value});
  }
  
  render(){

    const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }): posts;

    return (
      <section className='container'>
        <div className="search-container">

          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}  
          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>
        <Posts posts={filteredPosts} />
        <div className="button-container">
          <Button 
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
} */

export default Home;