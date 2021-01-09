import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import Products from '../container/products.container';
import ProductDetails from '../container/product-details.container';

function HomePage() {
  // states
  const [activeProductId, setActiveProductId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // effects
  useEffect(() => {
    if (activeProductId) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [activeProductId]);

  // event handlers
  const onModalClose = () => {
    setActiveProductId(0);
    setIsModalOpen(false);
  };

  return (
    <Box marginTop='10' padding='0 10'>
      <Products setActiveProductId={setActiveProductId} />

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ProductDetails id={activeProductId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default HomePage;
