# Copyright 1995-2095, Silicon Graphics, Inc.
# All Rights Reserved.
# 
# This is UNPUBLISHED PROPRIETARY SOURCE CODE of Silicon Graphics, Inc.;
# the contents of this file may not be disclosed to third parties, copied or
# duplicated in any form, in whole or in part, without the prior written
# permission of Silicon Graphics, Inc.
# 
# RESTRICTED RIGHTS LEGEND:
# Use, duplication or disclosure by the Government is subject to restrictions
# as set forth in subdivision (c)(1)(ii) of the Rights in Technical Data
# and Computer Software clause at DFARS 252.227-7013, and/or in similar or
# successor clauses in the FAR, DOD or NASA FAR Supplement. Unpublished -
# rights reserved under the Copyright Laws of the United States.

ABI =
SYSLIBS = -L $(ROOT)/usr/lib
WARNFLAGS = -woff 799

CFLAGS = \
    -D__GLS_FAKE_MUTEX=1 \
    -D__GLS_FAKE_THREAD_LOCAL_STORAGE=1 \
    -D__GLS_GL_DISPATCH=1 \
    -D__GLS_GL_DISPATCH_DSO=1 \
    -D__GLS_MSB_FIRST=1 \
    -D__GLS_PLATFORM_IRIX=1 \
    -D__GLS_RELEASE=\"0\" \
    -D__INLINE_INTRINSICS \
    -D_LONGLONG \
    -ansi \
    -nostdinc \
    -I../inc \
    -I$(ROOT)/usr/include \
    -O \
    $(ABI) \
    $(WARNFLAGS) \
    $(NULL)

LDFLAGS = \
    $(ABI) \
    -nostdlib \
    $(SYSLIBS) \
    -shared \
    $(NULL)

NULL =

OBJECTS = \
    cap.o \
    ctx.o \
    dec.o \
    encoding.o \
    exec.o \
    g_glsapi.o \
    g_cap.o \
    g_const.o \
    g_decbin.o \
    g_decswp.o \
    g_dectxt.o \
    g_dspcap.o \
    g_dspdec.o \
    g_dspexe.o \
    g_exec.o \
    g_op.o \
    global.o \
    glslib.o \
    glsutil.o \
    immed.o \
    opcode.o \
    parser.o \
    pixel.o \
    platform.o \
    read.o \
    readbin.o \
    readtxt.o \
    size.o \
    write.o \
    writebin.o \
    writetxt.o \
    $(NULL)

STUB = libGL.so
TARGET = libGLS.so

default: $(TARGET)

clean:
	rm -f g_glstub.o $(OBJECTS) $(STUB) $(TARGET) so_locations

$(STUB): g_glstub.o
	$(LD) -o $@ $(LDFLAGS) g_glstub.o -lc

$(TARGET): $(OBJECTS) $(STUB)
	$(LD) -o $@ $(LDFLAGS) -exports_file g_gls.exp \
		-fini __glsFinalDSO -init __glsInitDSO \
		$(OBJECTS) $(STUB) -lm -lc
