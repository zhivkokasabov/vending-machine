
import { CoinManagerProvider } from "providers/CoinManager.provider";
import { CashHopperProvider } from "providers/CashHopper.provider";
import { CodeProvider } from "providers/Code.provider";
import { ProductsProvider } from "providers/Products.provider";
import { MessageProvider } from "providers/Message.provider";

import { ResponsiveContainer } from "components/atoms/ResponsiveContainer";
import { Machine } from "components/organisms/Machine";

import { endpoints } from "constants/endpoints.const";

import { get } from "utils/http.util";

export default async function Home() {
  const products = await get({
    url: endpoints.getProducts(),
    options: {
      next: {
        revalidate: 60 * 60 // an hour
      }
    }
  });

  return (
    <ResponsiveContainer>
      <CoinManagerProvider>
        <CashHopperProvider>
          <CodeProvider>
            <ProductsProvider products={products?.data ?? []}>
              <MessageProvider>
                <Machine />
              </MessageProvider>
            </ProductsProvider>
          </CodeProvider>
        </CashHopperProvider>
      </CoinManagerProvider>
    </ResponsiveContainer>
  );
}
