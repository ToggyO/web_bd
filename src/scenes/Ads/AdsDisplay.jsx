/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { HelmetWrapper } from '@scenes/_components/HelmetWrapper';
import history from '@services/history';
import { QuickFilterForm } from '@scenes/_components/QuickFilterForm';
import { AdsTable } from '@scenes/_components/AdsTable';
import { Collapsed } from '@scenes/_components/Collapsed';

import { formatParamsForParakhnevich } from '@utils';
import './style.less';

const AdsDisplay = ({ data, loading, getAllAdsRequest, countryData }) => {
  const pathname = history.location.pathname.slice(1);
  const Type = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  let backpack;
  if (history.location.state) backpack = history.location.state.backpack;

  // determine "buy" or "sell" ads we should fetch
  let type;
  if (pathname === 'sell') type = 'buy';
  if (pathname === 'buy') type = 'sell';

  const [formValues, setFormValues] = useState(backpack);

  useEffect(() => {
    // if we came from the HomePage with some search data
    if (backpack) {
      return getAllAdsRequest(formatParamsForParakhnevich({ type, ...backpack }));
    }
    // if not
    return getAllAdsRequest(formatParamsForParakhnevich({ type, ...countryData }));
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    const sorterParams = {};
    if (sorter.field) {
      sorterParams.field = sorter.field;
      sorterParams.order = sorter.order;
    }

    const params = { type, ...pagination, ...sorterParams, ...formValues };
    getAllAdsRequest(formatParamsForParakhnevich(params));
  };

  const handleSearch = values => {
    history.push({ state: { backpack: values } });
    setFormValues(values);
    const params = { type, ...values };
    getAllAdsRequest(formatParamsForParakhnevich(params));
  };

  return (
    <HelmetWrapper title={`${Type} Bitcoins - Bitcoins Direct`} description="">
      <div className="paper paper--white">
        <div className="ads">
          <h1>{Type} bitcoins</h1>

          <Collapsed titleWord="filters">
            <QuickFilterForm
              defaultCurrency={countryData.currency}
              defaultLocation={countryData.location}
              onSearch={handleSearch}
              backpack={backpack}
            />
          </Collapsed>

          <AdsTable data={data} loading={loading} onChange={handleTableChange} withTerms type={type} />
        </div>
      </div>
    </HelmetWrapper>
  );
};

export default AdsDisplay;
