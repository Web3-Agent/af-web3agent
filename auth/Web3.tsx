import '@rainbow-me/rainbowkit/styles.css'
import merge from 'lodash.merge';

// import { getDefaultWallets, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
// import { goerli,polygon, polygonZkEvmTestnet, polygonMumbai, klaytn, baseGoerli, lineaTestnet } from '@wagmi/chains'
import { createPublicClient, http } from 'viem'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
// import { configureChains, WagmiConfig } from 'wagmi'
// import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import React from 'react'
// import { Chain } from '@rainbow-me/rainbowkit';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { config } from '../middleware';
import { goerli } from 'viem/chains';

import { ConnectButton, connectorsForWallets, RainbowKitProvider,
  darkTheme,
    Theme,
  getDefaultWallets,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    coinbaseWallet,
    imTokenWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    omniWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

  
import { particleWallet } from '@particle-network/rainbowkit-ext';
import { useMemo } from 'react';
import { ParticleNetwork } from '@particle-network/auth';



const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#0E7D02',
  },
} as Theme);

interface Props {
  children: ReactNode
}
// const mydefichain_testnet: Chain = {
//   id: 1131,
//   name: 'MyDefiChain Testnet',
//   network: 'MyDefiChain Testnet',
//   iconUrl: 'https://rpc.mydefichain.com/img/logo_mydefichain.jpg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'MyDefiChain',
//     symbol: 'DFI',
//   },
//   rpcUrls: {
//     public: { http: ['https://dmc.mydefichain.com/testnet'] },
//     default: { http: ['https://dmc.mydefichain.com/testnet'] },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: 'https://testnet3-dmc.mydefichain.com:8445/' },

//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 50890,
//     },
//   },
//   testnet: true,
// };
// const mydefichain_mainnet: Chain = {
//   id: 1130,
//   name: 'MyDefiChain Mainnet',
//   network: 'MyDefiChain Mainnet',
//   iconUrl: 'https://rpc.mydefichain.com/img/logo_mydefichain.jpg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'MyDefiChain',
//     symbol: 'DFI',
//   },
//   rpcUrls: {
//     public: { http: ['https://dmc.mydefichain.com/mainnet'] },
//     default: { http: ['https://dmc.mydefichain.com/mainnet'] },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: 'https://mainnet-dmc.mydefichain.com:8441/' },

//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 50890,
//     },
//   },
//   testnet: false,
// };
// const zeta_testnet: Chain = {
//   id: 7001,
//   name: 'ZetaChain Athens 3 Testnet',
//   network: 'ZetaChain Athens 3 Testnet',
//   iconUrl: 'https://www.zetachain.com/docs/img/favicon/favicon.png/?v=2',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'zetachain',
//     symbol: 'ZETA',
//   },
//   rpcUrls: {
//     public: { http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'] },
//     default: { http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'] },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public' },

//   },
//   contracts: {
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 50890,
//     },
//   },
//   testnet: false,
// };
// const pegoTestnet: Chain = {
//   id: 123456,
//   name: 'PEGO Testnet',
//   network: 'PEGO Testnet',
//   iconUrl: 'https://miro.medium.com/v2/resize:fill:99:99/1*fDYlU8GkCbt694t7UgRQ7Q.png',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'pegotestnet',
//     symbol: 'PG',
//   },
//   rpcUrls: {
//     public: { http: ['https://rpc.pegotest.net'] },
//     default: { http: ['https://rpc.pegotest.net'] },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: ' https://scan.pegotest.net' },

//   }
// };

// const pego: Chain = {
//   id: 20201022,
//   name: 'PEGO Mainnet',
//   network: 'PEGO Mainnet',
//   iconUrl: 'https://miro.medium.com/v2/resize:fill:99:99/1*fDYlU8GkCbt694t7UgRQ7Q.png',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'pegomainnet',
//     symbol: 'PG',
//   },
//   rpcUrls: {
//     public: { http: ['https://pegorpc.com'] },
//     default: { http: ['https://pegorpc.com'] },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: ' https://scan.pego.network' },

//   }
// };

// const INEVM: Chain = {
//   id: 1738,
//   name: 'INEVM',
//   network: 'INEVM',
//   iconUrl: 'https://docs.injective.network//img/injective.svg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'INEVM',
//     symbol: 'INJ',
//   },
//   rpcUrls: {
//     public: { http: ['https://inevm-rpc.caldera.dev'] },
//     default: { http: ['https://inevm-rpc.caldera.dev'] },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: 'https://inevm.calderaexplorer.xyz/' },

//   }
// };

// const AREON: Chain = {
//   id: 462,
//   name: 'Areon Network Testnet',
//   network: 'Areon Network Testnet',
//   iconUrl: 'https://docs.areon.network/AreonLogo.svg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'TAREA',
//     symbol: 'TAREA',
//   },
//   rpcUrls: {
//     public: { http: ['https://testnet-rpc.areon.network'] },
//     default: { http: ['https://testnet-rpc.areon.network'] },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: 'https://areonscan.com/' },

//   }
// };


const Fuji = {
  id: 1891,
  name: 'Fuji Testnet',
  network: 'Avalanche Fuji Testnet',
  iconUrl: 'https://docs.avax.network/img/favicon.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'AVAX',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['wss://avalanche-fuji-c-chain.publicnode.com'] },
    default: { http: ['wss://avalanche-fuji-c-chain.publicnode.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://phoenix.lightlink.io/' },

  }
};



// const { chains, publicClient } = configureChains(
//   [goerli,Fuji],
//   [
//     infuraProvider({ apiKey: process.env.INFURA_API_KEY }),
//     publicProvider()
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: 'Web3 Agent',
//   projectId: '234235sd',
//   chains
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient
// })
export function Web3Provider ( props: Props )
{
  
   const particle = useMemo(() => {
            return new ParticleNetwork({
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                appId: process.env.NEXT_PUBLIC_APP_ID as string,
                wallet: {
                    displayWalletEntry: true,
                },
            });
        }, []);
  const infurakey = process.env.NEXT_PUBLIC_INFURA_KEY 
   
const { chains, provider } = configureChains([ goerli,Fuji], [ infuraProvider( { apiKey : infurakey } ),publicProvider() ] )

   const popularWallets = useMemo(() => {
        return {
            groupName: 'Popular',
            wallets: [
                particleWallet({ chains, authType: 'google' }),
                particleWallet({ chains, authType: 'facebook' }),
                particleWallet({ chains, authType: 'apple' }),
                particleWallet({ chains }),
                injectedWallet({ chains }),
                // rainbowWallet({ chains }),
                coinbaseWallet({ appName: "Web3 Agent", chains }),
                metaMaskWallet({ chains }),
                // walletConnectWallet({ chains }),
            ],
        };
   }, [ particle ] );
  
// const { connectors } = getDefaultWallets({
//   appName: SITE_NAME,
//   chains,
// })
  
  const connectors = connectorsForWallets( [
      
        popularWallets
    ]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})
  
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact" theme={myTheme} coolMode chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
