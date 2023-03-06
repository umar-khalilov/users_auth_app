import { GeoDto } from './geo.dto';

export class AddressDto {
    readonly street: string | undefined;
    readonly suite: string | undefined;
    readonly city: string | undefined;
    readonly zipcode: string | undefined;
    readonly geo: GeoDto | undefined;
}
