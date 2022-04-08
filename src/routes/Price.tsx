import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api/coins";

const StyledTable = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.textColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
`;

const StyledTableRow = styled.div`
  flex-wrap: wrap;
`;

const StyledTh = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 10rem;
  width: 10rem;
  color: ${({ theme }) => theme.bgColor};
  padding: 1rem;
  word-break: keep-all;
  font-weight: bold;
`;

const StyledTd = styled.div`
  display: flex;
  color: ${({ theme }) => theme.bgColor};
  align-items: center;
  padding: 1rem;
  flex: 1;
  word-break: keep-all;
`;

interface PriceProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["priceOhlcv", coinId],
    () => fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Price Loading..."
      ) : (
        <>
          <StyledTable>
            <StyledTableRow>
              <StyledTh>Date</StyledTh>
              {data
                ?.map((price) => (
                  <StyledTd key={price.volume}>
                    {price.time_open.substring(0, 10)}
                  </StyledTd>
                ))
                .reverse()}
            </StyledTableRow>
            <StyledTableRow>
              <StyledTh>Lower</StyledTh>
              {data
                ?.map((price) => (
                  <StyledTd key={price.volume}>{price.low.toFixed(2)}</StyledTd>
                ))
                .reverse()}
            </StyledTableRow>
            <StyledTableRow>
              <StyledTh>Upper</StyledTh>
              {data
                ?.map((price) => (
                  <StyledTd key={price.volume}>
                    {price.high.toFixed(2)}
                  </StyledTd>
                ))
                .reverse()}
            </StyledTableRow>
          </StyledTable>
        </>
      )}
    </div>
  );
}

export default Price;
