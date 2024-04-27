import { Button } from '@mui/material';
import React, { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

const withBackButton = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithBackButton: React.FC<P> = (props) => {
    const navigate = useNavigate();

    const handleBackEvent = () => {
      navigate('/');
    };

    return (
      <div>
        <Button variant="contained" color="secondary" onClick={handleBackEvent}>
          Wstecz
        </Button>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return WithBackButton;
};

export default withBackButton;
