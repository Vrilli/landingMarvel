import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography } from 'antd';
import md5 from 'md5';


const { Title, Paragraph } = Typography;

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const publicKey = 'efeef0b4a27b679ec0f1aaf1880ab1ec';
      const privateKey = '30c42a90c34264f79bf3c18d9c4a9c81fc8a7042';
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);

      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        const data = await response.json();
        setCharacter(data.data.results[0]);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleBack = () => {
    navigate('/characters');
  };

  if (!character) return <p>Loading...</p>;

  return (
    <div className="p-6 flex gap-10 justify-center items-center h-screen">
      <Button
        onClick={handleBack}
        type="primary"
        className="p-5 bg-purple-500 text-white font-bold rounded-md"
      >
        Volver a la lista de personajes
      </Button>
      <div className="py-16 flex flex-col items-center">
        <Card
          title={<Title level={3} style={{fontWeight: "bold", color: "#b375ff"}} className="text-center">{character.name}</Title>}
          cover={
            <img
              alt={character.name}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              className="w-full h-auto"
            />
          }
          className="bg-white shadow-md rounded-md p-4 w-96"
        >
          <Paragraph className="text-center">{character.description || 'La descripcion no esta disponible en estos momentos'}</Paragraph>
        </Card>
      </div>
    </div>
  );
};

export default CharacterDetail;
