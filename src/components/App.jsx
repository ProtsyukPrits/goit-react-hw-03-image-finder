import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { addBaseFetch } from '..//services/api';
//
import { Container } from './Common.styled';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';


export class App extends Component {
  state = {
    materials: [],
    isLoading: false,
    error: null,
    showModal: false,
    query: '',
    page: 1,
    photoIsActive: null,
    status: ''
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    try {
      if (prevState.page !== page || prevState.query !== query) {
        this.setState({ });
        const material = await addBaseFetch(query, page);
        this.setState(prevState => ({
          materials: [...prevState.materials, ...material],
        }));
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      page: 1,
      query: e.target.elements.query.value,
      materials: [],
    });
    e.target.reset();
  };

  handleLoadMore = () => {
    this.setState({  });
    this.setState(prevState => ({
      page: prevState.page + 1,
      
    }));
  };


  openModal = e => {
    const imageId = Number(e.currentTarget.id);
    const photoIsActive = this.state.materials.find(
      image => image.id === imageId
    );
    this.setState({
      photoIsActive,
      showModal: true,
    });
    console.log('imageId',imageId)
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { materials, error, page, showModal, photoIsActive, status } = this.state;
    

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={photoIsActive.largeImageURL} alt={photoIsActive.tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.handleSubmit} />


        {error && <p>Wooops some errors!!! - {error.message}</p>}
        {materials.length > 0 && (
          <ImageGallery materials={materials} onClick={this.openModal} />
        )}
        {status === 'pending' && <Loader></Loader>}
        {page < materials.length  &&
        <Button loadMore={this.handleLoadMore} />}
      </Container>
    );
  }
}
