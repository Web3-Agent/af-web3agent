import { NextResponse } from 'next/server';
import { convertHexToString, convertStringToNumber } from '@/app/api-helpers/formatters';
import { getChainData } from '@/app/api-helpers/chain';
import { rpcGetAccountBalance } from '@/app/api-helpers/account-balance';
import { CovalentClient } from "@covalenthq/client-sdk";
import { configs } from '@/configs'
import { convertAmountFromRawNumber } from '@/app/api-helpers/formatters';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const address = url.searchParams.get('address');
        const network: any = url.searchParams.get('network');

        if (!address || !network) {
            return NextResponse.json({ message: 'Address & Network is required!', data: { network, address } }, { status: 400 });
        }




        const client = new CovalentClient(configs.COVALENT_API_KEY);
        let { data } = await client.BalanceService.getTokenBalancesForWalletAddress(network, address, { "quoteCurrency": "USD" });

        if (!data) {
            return NextResponse.json({ message: 'No Data Found!', data }, { status: 204 });
        }
        data = {
            ...data,
            items: data.items.map((item: any) => {
                return {
                    ...item,
                    balance: convertAmountFromRawNumber(item.balance, item.contract_decimals)
                }
            })
        }

        return NextResponse.json({ message: 'Here is details of account balance!', data: data }, { status: 200 });
    } catch (error: any) {
        const message = error.message || 'We ran into a problem Try again in a few minutes!';
        return NextResponse.json({ message, data: error }, { status: 500 });
    }
}