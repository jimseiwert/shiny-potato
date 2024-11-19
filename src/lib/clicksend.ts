import { Address } from "@/server/interfaces/member";

export class ClickSend {
    baseUrl: string = "https://rest.clicksend.com/v3";
    constructor() {
    }

    private credentials() {
        const basicAuth = `${process.env.CLICK_SEND_API_USERNAME}:${process.env.CLICK_SEND_API_KEY}`;
        const encodedString = btoa(basicAuth);
        return `Basic ${encodedString}`;
    }

    private async UploadFile(Base64: string) {
        const response = await fetch(`${this.baseUrl}/uploads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.credentials(),
            },

            body: JSON.stringify({ content: Base64 }),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.http_code == 200) {
                return result.data._url;
            }
        }
        throw new Error('Error uploading file');
    }

    async UploadAndSend(Base64: string, address: Address[], mailTemplateUsed: boolean, colorPrint: boolean, duplex: boolean): Promise<void> {
        const uploadedFile = await this.UploadFile(Base64);
        const recipients = this.convertAddressFormat(address)

        const response = await fetch(`${this.baseUrl}/post/letters/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.credentials(),
            },
            body: JSON.stringify({
                file_url: uploadedFile,
                template_used: mailTemplateUsed? 1 : 0,
                colour: colorPrint? 1 : 0,
                duplex: duplex? 1 : 0,
                priority_post: 1,
                recipients: recipients
            }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            if(result.http_code == 200){
                return;;
            }
            
        }

        throw new Error('Error sending letter');
    }

    private convertAddressFormat(address: Address[]): recipientType[] {
        const isProduction = process.env.NODE_ENV === 'production';
        
        return address.map((m: Address) => {
            if(!m.recipient) {
                throw new Error('Recipient is required');
            }
            if(!m.state || !m.city || !m.line1 || !m.zip) {
                throw new Error('Missing critical address values');
            }
            
            return {
                address_name: m.recipient,
                address_city: m.city,
                address_state: m.state,
                address_postal_code: isProduction ? m.zip : "11111",
                address_country: "US",
                address_line_1: m.line1,
                address_line_2: m.line2,
                return_address_id: "673662",
            };
        })
    }
}

type recipientType = {
    address_name: string,
    address_city: string,
    address_state: string,
    address_postal_code: string,
    address_country: string,
    address_line_1: string,
    address_line_2: string,
    return_address_id: string
}