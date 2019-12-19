import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useApiRequest from '../../services/api/hooks';
import { BlueprintRO } from '../Blueprints/Blueprints';
import { Spinner, Button, Input } from 'reactstrap';
import { ItemRO } from '../SurvivorDetails/SurvivorDetails';
import { SurvivorRO } from '../Survivors/Survivors';
import api from '../../services/api';

interface TradeRouteParams {
  survivorId: string;
}

const Trade: React.FC<RouteComponentProps<TradeRouteParams>> = props => {
  const { survivorId } = props.match.params;
  const [{ data: survivor }] = useApiRequest<BlueprintRO | null>(`/survivors/${survivorId}`, null);
  const [{ data: items, isLoading: itemsLoading }] = useApiRequest<ItemRO[]>(
    `/survivors/${survivorId}/items`,
    [],
  );
  const [{ data: survivors, isLoading: survivorsLoading }] = useApiRequest<SurvivorRO[]>(
    '/survivors',
    [],
  );

  const [recipient, setRecipient] = useState<SurvivorRO | null>(null);
  const [recipientItems, setRecipientItems] = useState<ItemRO[]>([]);
  const [givenItems, setGivenItems] = useState<{ id: string; quantity: number }[]>([]);
  const [offeredItems, setOfferedItems] = useState<{ id: string; quantity: number }[]>([]);

  if (survivor === null || itemsLoading || survivorsLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  async function onSelectSurvivor(recipientId: string) {
    const trader = survivors.find(s => s._id === recipientId);
    if (trader) {
      setRecipient(trader);
      const { data } = await api.get(`survivors/${recipientId}/items`);
      setRecipientItems(data);
    }
  }

  async function confirmTrade() {
    await api.post(`survivors/${survivorId}/trade`, {
      recipientId: recipient?._id,
      givenItems,
      offeredItems,
    });
  }

  // @todo: refactor method
  function addItemToTrade(item: ItemRO, giving: boolean) {
    const itemsToTrade = giving ? givenItems : offeredItems;
    const itemToGive = itemsToTrade.find(i => i.id === item.item._id);
    if (!itemToGive) {
      if (giving) {
        setGivenItems([...itemsToTrade, { id: item.item._id, quantity: 1 }]);
      } else {
        setOfferedItems([...itemsToTrade, { id: item.item._id, quantity: 1 }]);
      }
    } else {
      const inventoryItem = giving
        ? items.find(i => i.item._id === itemToGive.id)
        : recipientItems.find(i => i.item._id === itemToGive.id);
      if (inventoryItem && inventoryItem.quantity > itemToGive.quantity) {
        if (giving) {
          setGivenItems(
            itemsToTrade.map(i => {
              if (i.id === item.item._id) {
                return { id: item.item._id, quantity: i.quantity + 1 };
              }
              return i;
            }),
          );
        } else {
          setOfferedItems(
            itemsToTrade.map(i => {
              if (i.id === item.item._id) {
                return { id: item.item._id, quantity: i.quantity + 1 };
              }
              return i;
            }),
          );
        }
      }
    }
  }

  return (
    <>
      <h2>Trade</h2>
      <h3>{survivor.name}&apos;s Inventory:</h3>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.quantity} {item.item.name}
            <Button
              onClick={() => addItemToTrade(item, true)}
              className="ml-2"
              color="primary"
              outline
              size="sm"
            >
              Offer
            </Button>
          </li>
        ))}
      </ul>
      {givenItems.length > 0 && <h3>{survivor.name}&apos;s Offer:</h3>}
      <ul>
        {givenItems.map(item => (
          <li key={item.id}>
            {item.quantity} {items.find(i => i.item._id === item.id)?.item.name}
          </li>
        ))}
      </ul>
      <h3>Who do you want to trade with?</h3>
      <Input defaultValue="default" onChange={e => onSelectSurvivor(e.target.value)} type="select">
        <option disabled value="default">
          Select other survivor...
        </option>

        {survivors.map(s => {
          if (survivor.name !== s.name)
            return (
              <option disabled={s.infected} value={s._id} key={s._id}>
                {s.name}
                {s.infected ? ' - Infected!' : ''}
              </option>
            );
          return false;
        })}
      </Input>
      {recipient && (
        <>
          <h3>{recipient.name}&apos;s Inventory:</h3>
          <ul>
            {recipientItems.map(item => (
              <li key={item._id}>
                {item.quantity} {item.item.name}
                <Button
                  onClick={() => addItemToTrade(item, false)}
                  className="ml-2"
                  color="primary"
                  outline
                  size="sm"
                >
                  Offer
                </Button>
              </li>
            ))}
          </ul>
          {offeredItems.length > 0 && <h3>{recipient.name}&apos;s Offer:</h3>}
          <ul>
            {offeredItems.map(item => (
              <li key={item.id}>
                {item.quantity} {recipientItems.find(i => i.item._id === item.id)?.item.name}
              </li>
            ))}
          </ul>{' '}
          <Button onClick={confirmTrade} className="w-100" color="primary">
            Confirm Trade
          </Button>
        </>
      )}
    </>
  );
};

export default Trade;
