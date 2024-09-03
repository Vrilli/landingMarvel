import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { Button, Table } from 'antd';

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      const publicKey = 'efeef0b4a27b679ec0f1aaf1880ab1ec';
      const privateKey = '30c42a90c34264f79bf3c18d9c4a9c81fc8a7042';
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);

      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const columns = [
    {
      title: <div>
        <h2 className='text-center text-xl text-purple-500 font-bold'>Nombre</h2>
      </div>,
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Character) => (
        <Link className='underline text-[#1890ff]' to={`/character/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: <div>
        <h2 className='text-center text-xl text-purple-500 font-bold'>Descripcion</h2>
      </div>,

      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <p className='text-center'>{text ? text : 'La descripcion no esta disponible en estos momentos'}</p>,
    },
    {
      title: <div>
        <h2 className='text-center text-xl text-purple-500 font-bold'>Imagenes</h2>
      </div>,

      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: { path: string; extension: string }) => (
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt="Thumbnail"
          width="100"
        />
      ),
    },
  ];

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <div className='px-9 flex justify-between items-center bg-purple-50 fixed z-50 w-full'>
        <img className='w-24 h-24' src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" alt="" />
        <Button type='primary' className='text-sm font-bold bg-purple-500 rounded-md' onClick={handleClick}>Cerrar sesion</Button>
      </div>

      <h1 className="animate__animated animate__swing text-center text-4xl text-purple-500 font-bold pt-28">Listado de  personajes  de Marvel</h1>
      <Table className='p-16'
        dataSource={characters}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CharacterList;
