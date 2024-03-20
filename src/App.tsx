import React, { useEffect, useMemo, useState } from 'react';
import Grid from './components/Grid';
import ButtonDelete from './components/ButtonDelete';
import ButtonLink from './components/ButtonLink';
import DetailPanel from './components/DetailPanel';
import DropdownList from './components/DropdownList';
import Label from './components/Label';
import { deleteStocksDataById, getStocksData } from './dao/dao-stocks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';
import ShowOnHover from './components/ShowOnHover';

type StockDataItem = {
  id: number;
  symbol: string;
  name: string;
  last_price: number;
  market_cap: string;
  tag: string;
};

type StockInfoState = {
  symbol: string;
  name: string;
  market_cap: string;
  tag: string;
};

const defaultTag = 'All';

const showToastError = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    toastId: 'error-toast' // use toastId to prevent duplicate.
  });
};

// Fake array helps in building grid loading skeleton.
const fakeData = Array(4).fill({});

function App() {
  // Loading state for get stocks API as state, inital state it true for better UX.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Storing the row data of get stocks API as state.
  const [dataState, setDataState] = useState<Array<StockDataItem>>([]);
  // Storing current deleting Id as state, using it for:
  // 1- Reading the value of the ID.
  // 2- Give a loading indecator when deleting is running.
  const [currentDeletingIdState, setCurrentDeletingIdState] = useState<null | number>(null);
  // Storing current selected tag from filter as state
  const [selectedTagState, setSelectedTagState] = useState<string>(defaultTag);
  // Storing current selected stock info to be viewed in detail panel as state
  const [currentStockInfoState, setCurrentStockInfoState] = useState<null | StockInfoState>(null);

  const fetchStocks = async () => {
    setIsLoading(true);
    try {
      const data = await getStocksData();
      setDataState(data);
    } catch (err) {
      showToastError((err as Error).message)
    }
    // reset loading flag
    setIsLoading(false);
  }

  const deleteStockById = async (id: number) => {
    // reset selected stock info for better UX.
    setCurrentStockInfoState(null);

    setCurrentDeletingIdState(id);
    try {
      await deleteStocksDataById(id);
      // Remove deleted item from component state for better UX, no need to call the API.
      setDataState(dataState.filter((item) => item.id !== id));
    } catch (err) {
      showToastError((err as Error).message)
    }
    // reset deleting Id
    setCurrentDeletingIdState(null);
  }

  useEffect(() => {
    // fetch stocks once when component is mounted.
    fetchStocks();
  }, []);


  // Memoizing filtered data array to avoid re-render/re-caculate. 
  const filteredDataByTag = useMemo(() => {
    return dataState.filter(({ tag }) => {
      // filter data by selected tag or return all when tag value is 'All'.
      return selectedTagState === tag || selectedTagState === defaultTag;
    })
  }, [dataState, selectedTagState]);

  // Memoizing tag options array to avoid re-render/re-caculate. 
  const tagOptions = useMemo(() => {
    const tags: Array<string> = [];
    // build a unique array of tags.
    dataState.forEach(({ tag }) => {
      if (tags.indexOf(tag) === -1) {
        tags.push(tag);
      }
    })

    // append defaultTag value at the top of the array.
    return [defaultTag, ...tags];
  }, [dataState]);

  // Memoizing array to avoid re-render. 
  const KeyValuePairList = useMemo(() => {
    // build Key value pair array to be passed to DetailPanel component.
    return [
      {
        key: 'Symbol',
        value: currentStockInfoState?.symbol
      },
      {
        key: 'Name',
        value: currentStockInfoState?.name
      },
      {
        key: 'Market Cap',
        value: currentStockInfoState?.market_cap
      },
      {
        key: 'Tag',
        value: currentStockInfoState?.tag
      }
    ]
  }, [currentStockInfoState]);

  const isFilteredDataEmpty = filteredDataByTag.length === 0 && !isLoading;
  const filteredData = isLoading && filteredDataByTag.length === 0 ? fakeData : filteredDataByTag;

  return (
    <div className="App p-2">
      <header>
        <h1 className='text-2xl'>Stock App</h1>
        {/* Filter bar - start */}
        <div className="flex justify-end mb-8">
          <Label htmlFor="tag-filter" className="place-self-center" >Tag Filter:</Label>
          <DropdownList id="tag-filter" defaultValue={defaultTag} options={tagOptions} onSelect={(value) => {
            // reset selected stock info for better UX.
            setCurrentStockInfoState(null);
            // set selected tag
            setSelectedTagState(value);
          }} />
        </div>
        {/* Filter bar - end */}
      </header>
      <main>
        {/* Data grid - start */}
        <Grid>
          <Grid.Row className="grid-cols-4" isHeader>
            <Grid.Cell isHeader>Symbol</Grid.Cell>
            <Grid.Cell isHeader>Last Price</Grid.Cell>
            <Grid.Cell isHeader>Tag</Grid.Cell>
            <Grid.Cell isHeader>Actions</Grid.Cell>
          </Grid.Row>
          {filteredData.map(({ id, symbol, name, last_price, market_cap, tag }, index) => {

            // check if the grid row is deleting the current item.
            const isRowInDeletingMode: boolean = currentDeletingIdState === id;

            /* *************************
                NOTE: Normally, there should be pagination for big data, 
                but based on the requirements and the mock, it's not needed.
            **************************** */

            return <Grid.Row isLoading={isRowInDeletingMode} className="grid-cols-4" key={`${id}-${index}`}>
              <Grid.Cell isLoading={isLoading}>
                {/* 
                note: based on the mocks and the requirements there is no need to use anchor tag,
                there is no deeplink to detail info, its better to use button looks like a link.
               */}
                <ButtonLink className="min-w-20" onClick={() => {
                  // set selected stock info
                  setCurrentStockInfoState({
                    symbol,
                    name,
                    // last_price, // NOTE: Not needed based on the mocks. 
                    market_cap,
                    tag
                  })
                }} disabled={isRowInDeletingMode}>{symbol}</ButtonLink>
              </Grid.Cell>
              <Grid.Cell isLoading={isLoading} >{last_price}</Grid.Cell>
              <Grid.Cell isLoading={isLoading} >{tag}</Grid.Cell>
              <Grid.Cell isLoading={isLoading} className='min-h-20'>
                {/* show loading when delete item is in progress */}
                {isRowInDeletingMode && <Loading />}
                {!isRowInDeletingMode && id && <ShowOnHover>
                  <ButtonDelete onClick={() => {
                    deleteStockById(id)
                  }} />
                </ShowOnHover>}
              </Grid.Cell>
            </Grid.Row>
          })}
        </Grid>
        {isFilteredDataEmpty && <div className="flex justify-center border border-grid-border-color p-20">
          <p className="inline-block text-no-data-color text-xl">No Data!</p>
        </div>}
        {/* Data grid - end */}
        {/* Stock Detail Panel - start */}
        {currentStockInfoState && <DetailPanel className="mt-8" panelTitle="Stock Detail" KeyValuePairList={KeyValuePairList} />}
        {/* Stock Detail Panel - end */}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
