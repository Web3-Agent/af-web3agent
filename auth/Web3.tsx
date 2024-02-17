import '@rainbow-me/rainbowkit/styles.css'
import merge from 'lodash.merge';
import {

  RainbowKitProvider,
  darkTheme,
  Theme,
  getDefaultWallets,
  lightTheme,
  connectorsForWallets,
  
} from '@rainbow-me/rainbowkit';
// import { getDefaultWallets, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
// import { goerli,polygon, polygonZkEvmTestnet, polygonMumbai, klaytn, baseGoerli, lineaTestnet } from '@wagmi/chains'
import { createPublicClient, http } from 'viem'

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode, useMemo } from 'react'
import { infuraProvider } from 'wagmi/providers/infura'
import React from 'react'
// import { Chain } from '@rainbow-me/rainbowkit';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { config } from '../middleware';
import { goerli } from 'viem/chains';

import { ParticleNetwork } from '@particle-network/auth';
import { particleWallet } from '@particle-network/rainbowkit-ext';
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
    // walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: '#0E7D02',

  },

} as Theme);

interface Props {
  children: ReactNode
}

const Fuji = {
  id: 43113,
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
    public: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
    default: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.snowtrace.io/' },

  }
};
const AREON = {
  id: 462,
  name: 'Areon Network Testnet',
  network: 'Areon Network Testnet',
  iconUrl: 'https://docs.areon.network/AreonLogo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'TAREA',
    symbol: 'TAREA',
  },
  rpcUrls: {
    public: { http: ['https://testnet-rpc.areon.network'] },
    default: { http: ['https://testnet-rpc.areon.network'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://areonscan.com/' },

  }
};




const { chains, publicClient } = configureChains(
  [Fuji, goerli],
  [
    infuraProvider({ apiKey: process.env.INFURA_API_KEY }),
    publicProvider()
  ]
);

  









  

export function Web3Provider ( props: Props )
{
  
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [goerli,Fuji],
    [publicProvider()]
  );

  const commonOptions = { chains, projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID as string };


const particle = useMemo(() => {
            return new ParticleNetwork({
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
                appId: process.env.NEXT_PUBLIC_APP_ID as string,
                wallet: {
                    displayWalletEntry: true,
                },
            });
   }, [] );
  

  const popularWallets = useMemo(() => ({
    groupName: 'Popular',
    wallets: [
      particleWallet({ chains, authType: 'google' }),
      particleWallet({ chains, authType: 'facebook' }),
      particleWallet({ chains, authType: 'apple' }),
      particleWallet({ chains }),
      injectedWallet(commonOptions),
      // rainbowWallet(commonOptions),
      // coinbaseWallet({ appName: 'RainbowKit demo', ...commonOptions }),
      // metaMaskWallet(commonOptions),
      // walletConnectWallet(commonOptions),
    ],
  }), [particle]);

  const connectors = connectorsForWallets([
    popularWallets
  ]);

  // const config = getDefaultConfig({
  //     appName: 'My RainbowKit App',
  //     projectId: 'YOUR_PROJECT_ID',
    
  //     ssr: true, // If your dApp uses server side rendering (SSR)
  //   });
  const wagmiClient = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,

    
  });
   
  
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider modalSize="compact" theme={lightTheme({

        borderRadius: 'medium',
        accentColor: '#388E3C',
        fontStack: 'rounded',


      })} coolMode chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
