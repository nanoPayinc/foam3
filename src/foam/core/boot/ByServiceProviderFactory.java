/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.boot;

import foam.lang.X;
import foam.lang.XFactory;

/**
 * An XFactory which returns a service from the supplied context which is
 * either suffixed with the _<spid> or just _ if no spid is found or that
 * service isn't found.
 *
 * The purpose of this is so that CSpec's can be scoped by SPID.
 **/
public class ByServiceProviderFactory
  implements XFactory, CSpecAware
{

  protected CSpec spec_;

  public ByServiceProviderFactory() {
  }

  // impl CSpecAware
  public CSpec getCSpec() { return spec_; }

  public void setCSpec(CSpec spec) { spec_ = spec; }

  public void clearCSpec() { }

  // impl XFactory
  public Object create(X x) {
    String spid = (String) x.get("spid");

    if ( spid != null ) {
      Object service = x.get(getCSpec().getName() + "_" + spid);

      if ( service != null ) return service;
    }

    return x.get(getCSpec().getName() + "_");
  }
}
