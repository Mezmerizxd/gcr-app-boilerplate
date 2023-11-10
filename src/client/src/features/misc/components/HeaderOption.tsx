import React from 'react';
import { Button } from '../../../components/Elements';
import { useNavigate } from 'react-router-dom';

export const HeaderOption = ({ name, href, onClick }: { name: string; href?: string; onClick?: () => void }) => {
  const navigate = useNavigate();

  return (
    <Button
      size="sm"
      variant="hidden"
      onClick={() => {
        navigate(href);
        onClick();
      }}
    >
      {name}
    </Button>
  );
};
