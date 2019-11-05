import React from 'react';
import Card from './Card';

export default function Container({ type, cards, visible }) {
  return cards.map((element, index) => {
    if (type === 'TABLE' && !visible && index === 0) {
      return <Card key={index} number={0} type={element.type} />;
    } else {
      return <Card key={index} number={element.number} type={element.type} />;
    }
  });
}
