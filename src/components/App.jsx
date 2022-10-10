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
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    try {
      if (prevState.page !== page || prevState.query !== query) {
        this.setState({ isLoading: true });
        const dataFetch = await addBaseFetch(query, page);
        this.setState(prevState => ({
          materials: [...prevState.materials, ...dataFetch],
          isLoading: false,
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
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { materials, error, showModal, photoIsActive, isLoading } =
      this.state;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.closeModal}>
            {/* Я вирішив зробити модалку як універсальнна обгортка,
             а в середині рендерити контент який потрібно. */}
            <img src={photoIsActive.largeImageURL} alt={photoIsActive.tags} />
          </Modal>
        )}

        {<Searchbar onSubmit={this.handleSubmit} />}

        { materials.length === 0 && (
          <p>Nothing found, enter something in the search</p>
        )}

        {error && <p>Wooops some errors!!!</p>}
        {materials.length > 0 && (
          <ImageGallery materials={materials} onClick={this.openModal} />
        )}

        {isLoading && <Loader />}

        {materials.length > 0 && (
          <Button loadMore={this.handleLoadMore} isLoading={isLoading} />
        )}
      </Container>
    );
  }
}
