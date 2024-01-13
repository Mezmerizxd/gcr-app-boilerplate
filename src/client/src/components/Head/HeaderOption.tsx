import React from 'react';
import { Button } from '../../components/Elements';
import { useNavigate } from 'react-router-dom';

export const HeaderOption = ({
  name,
  href,
  onClick,
  customUrl,
}: {
  name: string;
  href?: string;
  onClick?: () => void;
  customUrl?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <Button
      size="sm"
      variant="hidden2"
      onClick={() => {
        if (customUrl) {
          window.open(href, '_blank');
          return;
        }
        navigate(href);
        onClick();
      }}
    >
      {name}
    </Button>
  );
};
